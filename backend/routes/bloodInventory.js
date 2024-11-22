const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const BloodInventory = require('../models/BloodInventory')
let fetchBloodBank = require('../middleware/fetchBloodBank')

// Route 1 : Get  BloodInventory Details using GET : "/api/bloodInventory/getInventoryDetails" : LOGIN required
router.get('/getInventoryDetails', async (req,res)=> {
    try {
        return res.json({message: "API not set yet"})
    } 
    catch (error) {
        console.error(error.message);
        res.json(500).send("Internal server error");
    }
})

module.exports = router