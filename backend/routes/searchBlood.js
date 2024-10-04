const express = require('express')
const router = express.Router()
const Donor = require('../models/Donor')

// Route 1 : Get all matching Donor Names using GET : "/api/donation/getDonationDetails" : LOGIN not required
router.get('/searchDonorMatch', async (req,res)=> {
    try {
        const donors = await Donor.find({D_BloodGroup: req.body.D_BloodGroup}).select("-D_Password")
        return res.json({ success: true, donors})  
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

module.exports = router