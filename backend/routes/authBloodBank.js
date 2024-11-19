const express = require('express')
const router = express.Router()
const { validationResult, body } = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const bcrypt = require('bcrypt') // used to hash passwords
const jwt = require('jsonwebtoken') // used to generate BloodBank auth web token
const JWT_SECRET = "BloodBankisaMERNapp";
const mongoose = require('mongoose');   
let fetchBloodBank = require('../middleware/fetchBloodBank')

const BloodBank = require("../models/BloodBank")

// Route 1 : Create a BloodBank using : POST "/api/authBloodBank/createBloodBank" No Login Required
router.post('/createBloodBank',[
    body('B_Email',"Invalid Name").isLength({min: 5}),
    body('B_Password').isLength({min: 5}),
], async(req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success: false, error: errors.array });
    }

    try {
        
        let bloodBank = await BloodBank.findOne({B_Email: req.body.B_Email})
        if(bloodBank){
            return res.status(400).json({ success: false, error: "User Exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.B_Password, salt);

        bloodBank = await BloodBank.create({
            B_Email:   req.body.B_Email, 
            B_Password:   secPass,
            B_LiscenceNo:   0,
            B_Name:   "default",
            B_Address:   "default",
            B_City:  "default",
            B_State:   "default",
            B_IsGov:   false,
            B_Contact:   0,
            B_InventoryAPI: "default" 
        });

        const data = {
            user: {
                id: bloodBank.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ success: true, authToken })
    } 
    catch (error) {
        console.log(error.message);
        res.json(505).send("Internal Server Error");
    }
})

// Route 2 : Authenticate a BloodBank using POST : "/api/authBloodBank/login" No login required
router.post('/login',[
    body('B_Email',"Invalid Name").isLength({min: 5}),
    body('B_Password').isLength({min: 5}),
], async (req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success: false, error: errors.array});
    }

    const {B_Email,B_Password} = req.body;
    try {
        
        let bloodBank = await BloodBank.findOne({B_Email})
        if(!bloodBank){
            return res.status(400).json({ success: false, error: "PLease try to login with valid credentials"})
        }

        const passwordCompare = await bcrypt.compare(B_Password,bloodBank.B_Password);
        if(!passwordCompare){
            return res.status(400).json({success: false, error: "PLease try to login with valid credentials"})
        }

        const data = {
            bloodBank: {
                id: bloodBank.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ success: true, authToken})
    } 
    catch (error) {
        console.log(error.message);
        res.json(505).send("Internal Server Error");
    }
})

// Route 3 : Get Logged in donor details using :  POST : "/api/authBloodBank/getBloodBank" : login required
router.post('/getBloodBank',fetchBloodBank, async (req,res)=> {
    try {
        
        let BloodBankId = req.user.id;
        const user = await BloodBank.findById(BloodBankId).select("-B_Password")
        if(user) res.send(user)
        else res.json({success: false})

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).json({"error": error.message })
    }
})

// Route 4 : Update a BloodBank detail using : PUT "/api/authBloodBank/updateBloodBank" Login Required
router.put('/updateBloodBank/:id',fetchBloodBank, async (req,res)=> {

    const {B_LiscenceNo,B_Name,B_Address,B_City,B_State,B_IsGov,B_Contact,B_InventoryAPI} = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, error: "Invalid donor ID" });
        }
        
        // create new blood bank object
        const newBloodBank = {};
        if (B_LiscenceNo) newBloodBank.B_LiscenceNo = B_LiscenceNo;
        if (B_Name) newBloodBank.B_Name = B_Name;
        if (B_Address) newBloodBank.B_Address = B_Address;
        if (B_City) newBloodBank.B_City = B_City;
        if (B_State) newBloodBank.B_State = B_State;
        if (B_IsGov) newBloodBank.B_IsGov = B_IsGov;
        if (B_Contact) newBloodBank.B_Contact = B_Contact;
        if (B_InventoryAPI) newBloodBank.B_InventoryAPI = B_InventoryAPI;

        // find the blood bank to be updated and update it
        let bloodBank = await BloodBank.findById(req.params.id);
        if (!bloodBank) return res.status(404).send("Blood Bank not found");

        bloodBank = await BloodBank.findByIdAndUpdate(req.params.id, {$set: newBloodBank}, {new: true}).select("-B_Password")
        res.json({ success: true, bloodBank })
    } 
    catch (error) {
        console.log(error.message);
        res.json(505).send("Internal Server Error");
    }
})


module.exports = router