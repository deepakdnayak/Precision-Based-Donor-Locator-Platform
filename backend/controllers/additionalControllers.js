const Donor = require('../models/Donor')
const axios = require("axios");
const BloodBank = require("../models/BloodBank");
const BloodBankInventory = require("../models/BloodBankInventory"); 

const searchDonor = async (req,res)=> {
    try {
        const donors = await Donor.find({D_BloodGroup: req.body.D_BloodGroup}).select("-D_Password")
        return res.json({ success: true, donors})  
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
}

const searchBloodBanks = async (req, res) => {
    try {
        const { bloodGroup, quantity } = req.body;

        // Validate the input
        if (!bloodGroup || !quantity) {
            return res.status(400).json({ success: false, message: "Please provide blood group and quantity" });
        }

        // Query Blood Bank Inventories for availability
        const inventories = await BloodBankInventory.find({
            [bloodGroup]: { $gte: quantity } // Check if the blood group has the required quantity or more
        }).populate("BloodBankId"); // Populate BloodBankId to fetch details of the Blood Bank

        if (inventories.length === 0) {
            return res.status(404).json({ success: false, message: "No blood banks found with the requested blood group and quantity" });
        }

        // Format the response with Blood Bank details
        const bloodBanks = inventories.map((inventory) => ({
            bloodBankDetails: inventory.BloodBankId,
            bloodGroup: bloodGroup,
            availableQuantity: inventory[bloodGroup]
        }));

        return res.json({ success: true, bloodBanks });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
}

const updateInventory = async (req, res) => {
    try {
        // Fetch all blood banks
        const bloodBanks = await BloodBank.find();
        
        // Process each blood bank
        const inventoryPromises = bloodBanks.map(async (bank) => {
            try {
                // Fetch inventory details from the API
                const response = await axios.get(bank.B_InventoryAPI);

                // Extract inventory details
                const inventoryData = response.data; // Assuming API returns data in correct format

                // Map inventory details to the schema
                const inventory = {
                    BloodBankId: bank._id,
                    Aplus: inventoryData.Aplus || 0,
                    Amin: inventoryData.Amin || 0,
                    Bplus: inventoryData.Bplus || 0,
                    Bmin: inventoryData.Bmin || 0,
                    Oplus: inventoryData.Oplus || 0,
                    Omin: inventoryData.Omin || 0,
                    ABplus: inventoryData.ABplus || 0,
                    ABmin: inventoryData.ABmin || 0,
                };

                // Upsert the inventory in the database
                await BloodBankInventory.findOneAndUpdate(
                    { BloodBankId: bank._id }, // Match by BloodBankId
                    inventory, // New data
                    { upsert: true, new: true } // Create new if doesn't exist
                );
            } catch (apiError) {
                console.error(
                    `Failed to fetch inventory for Blood Bank ID: ${bank._id}`,
                    apiError.message
                );
            }
        });

        // Wait for all inventory updates to complete
        await Promise.all(inventoryPromises);

        res.status(200).json({ message: "Inventories updated successfully!" });
    } catch (err) {
        console.error("Error updating inventories:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const findNearestDonors = async (req, res) => {
    const { bloodGroup, userLatitude, userLongitude } = req.body;

    try {
        // Validate inputs
        if (!bloodGroup || !userLatitude || !userLongitude) {
            return res.status(400).json({ success: false, error: "Missing required body parameters." });
        }

        // Parse latitude and longitude
        const latitude = parseFloat(userLatitude);
        const longitude = parseFloat(userLongitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ success: false, error: "Invalid latitude or longitude." });
        }

        // Define max distance (in meters) and eligibility criteria
        const maxDistance = 50000; // 50 km
        const donationEligibilityDate = new Date();
        donationEligibilityDate.setMonth(donationEligibilityDate.getMonth() - 3); // Example: donors who donated at least 3 months ago

        // Find eligible donors
        const donors = await Donor.find({
            D_BloodGroup: bloodGroup, // Match blood group
            "location": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude] // Longitude first, then latitude
                    },
                    $maxDistance: maxDistance
                }
            },
            D_LastDonationDate: { $lte: donationEligibilityDate } // Check last donation date
        })
            .limit(10) // Limit to 10 results
            .select("-D_Password"); // Exclude sensitive fields like password

        // Return donors to frontend
        return res.json({ success: true, donors });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = { searchDonor , searchBloodBanks, updateInventory, findNearestDonors };