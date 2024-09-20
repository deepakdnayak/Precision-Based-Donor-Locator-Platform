const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Donation = require('../models/Donation')
const BloodInventory = require('../models/BloodInventory')
const Donor = require('../models/Donor')

let fetchBloodBank = require('../middleware/fetchBloodBank')

// Route 1 : Get all Blood Donation Details using GET : "/api/donation/getDonationDetails" : LOGIN required
router.get('/getDonationDetails', fetchBloodBank, async (req,res)=> {
    try {
        const donation = await Donation.find({ BloodBankID: req.user.id })
        return res.json(donation)    
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 2 : Add a Donation using POST "/api/donation/addDonation" : LOGIN required
router.post('/addDonation', fetchBloodBank, async (req,res)=> {
    try {
        const { DonorID, Blood_QTY, Blood_Group, Blood_Weight, Donation_Date, Blood_Expiry_Date } = req.body;
        
        const existingDonation = await Donation.findOne({DonorID, Donation_Date});
        if(existingDonation) {
            return res.status(400).json({"error": "Entry for the same donor on same date akready exists"});
        }

        let bloodInventory = await BloodInventory.findOne({BloodBankID: req.user.id});
        if(!bloodInventory) {
            bloodInventory = new BloodInventory({
                BloodBankID: req.user.id,
                Aplus: 0,
                Amin: 0,
                Bplus: 0,
                Bmin: 0,
                Oplus: 0,
                Omin: 0,
                ABplus: 0,
                ABmin: 0,
            })
        }

        switch (Blood_Group) {
            case 'A+':
                bloodInventory.Aplus = (bloodInventory.Aplus || 0) + parseInt(Blood_QTY);
                break;
            case 'A-':
                bloodInventory.Amin = (bloodInventory.Amin || 0) + parseInt(Blood_QTY);
                break;
            case 'B+':
                bloodInventory.Bplus = (bloodInventory.Bplus || 0) + parseInt(Blood_QTY);
                break;
            case 'B-':
                bloodInventory.Bmin = (bloodInventory.Bmin || 0) + parseInt(Blood_QTY);
                break;
            case 'O+':
                bloodInventory.Oplus = (bloodInventory.Oplus || 0) + parseInt(Blood_QTY);
                break;
            case 'O-':
                bloodInventory.Omin = (bloodInventory.Omin || 0) + parseInt(Blood_QTY);
                break;
            case 'AB+':
                bloodInventory.ABplus = (bloodInventory.ABplus || 0) + parseInt(Blood_QTY);
                break;
            case 'AB-':
                bloodInventory.ABmin = (bloodInventory.ABmin || 0) + parseInt(Blood_QTY);
                break;
            default:
                throw new Error('Invalid blood group');
        }

        const donation = new Donation({
            BloodBankID: req.user.id , DonorID, Blood_QTY, Blood_Group, Blood_Weight, Donation_Date: new Date(Donation_Date), Blood_Expiry_Date: new Date(Blood_Expiry_Date)
        })
        const savedDonation = await donation.save();
        const savedBloodInventory = await bloodInventory.save();

        return res.json({savedDonation, savedBloodInventory});
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

// Route 3 : Get all Donor Names using GET : "/api/donation/getDonationDetails" : LOGIN required
router.get('/searchDonorDetails', async (req,res)=> {
    try {
        const donors = await Donor.findOne({D_Email: req.body.D_Email}).select("-D_Password")
        return res.json({ success: true, donors})  
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})



module.exports = router