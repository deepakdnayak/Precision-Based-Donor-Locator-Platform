const express = require('express')
const router = express.Router()
const { searchDonor , searchBloodBanks, updateInventory, findNearestDonors } = require('../controllers/additionalControllers')

// Route 1 : Get all matching Donor Names using GET : "/api/donation/getDonationDetails" : LOGIN not required
router.post('/searchDonorMatch', searchDonor );

// Route: Search Blood Availability in Blood Bank Inventories
// GET: "/api/bloodbank/searchBloodBanks" : LOGIN not required
router.post('/searchBloodBanks', searchBloodBanks );


// Function to fetch and update blood bank inventory
router.get("/update-inventories", updateInventory );


// Function to findNearestDonors
router.post("/findTheNearestDonors", findNearestDonors);

module.exports = router