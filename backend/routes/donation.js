const express = require('express')
const router = express.Router()
const { searchDonor } = require('../controllers/additionalControllers')

// Route : Get all matching Donor Names using GET : "/api/donation/getDonationDetails" : LOGIN not required
router.post('/searchDonorMatch', searchDonor );

module.exports = router