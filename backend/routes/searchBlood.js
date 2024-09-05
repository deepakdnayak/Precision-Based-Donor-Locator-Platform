const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const BloodInventory = require('../models/BloodInventory')
const BloodBank = require("../models/BloodBank")
const Donor = require("../models/Donor")

let fetchBloodBank = require('../middleware/fetchBloodBank')

// Route 1 : Get Blood Bank Details using GET : "/api/searchBlood/findBloodBank" 
router.get('/findBloodBank', async (req,res)=>{
    const {bloodGroup} = req.body;
    let availableBloodBanks = [];

    try {
        const bloodInventory = await BloodInventory.find();
        for (const bloodBank of bloodInventory) {
            if( bloodBank[bloodGroup] && bloodBank[bloodGroup]>0 ) {
                const bloodBankDetail = await BloodBank.findById(bloodBank.BloodBankID).select("-B_Password");
                if(bloodBankDetail){
                    availableBloodBanks.push(bloodBankDetail);
                }
            }
        }
    
        return res.json(availableBloodBanks);
    } 
    catch (error) {
        console.error(error.message);
        return res.json(500).send("Internal server error");
    }
})

// Route 2 : Get Donor Details using GET : "/api/searchBlood/findDonor" 
router.get('/findDonor', async (req,res)=> {
    const { bloodGroup } = req.body;
    let availableDonor = [];

    try {
        const donors = await Donor.find().select("-D_Password");
        
        const today = new Date();
        const date56DaysAgo = new Date(today.setDate(today.getDate()-56));

        for(const donor of donors){
            const lastDonationDate = new Date(donor.D_LastDonationDate);
            if(donor.D_BloodGroup==bloodGroup && lastDonationDate <= date56DaysAgo){
                availableDonor.push(donor);
                
            }
        }
        return res.json(availableDonor);
    } 
    catch (error) {
        console.error(error.message);
        return res.json(500).send("Internal server error");
    }
});

module.exports = router