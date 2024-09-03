const express = require('express')
const router = express.Router()
const { query,validationResult, body } = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const bcrypt = require('bcrypt') // used to hash passwords
const jwt = require('jsonwebtoken') // used to generate BloodBank auth web token
const JWT_SECRET = "BloodBankisaMERNapp";

let fetchBloodBank = require('../middleware/fetchBloodBank')

const BloodBank = require("../models/BloodBank")

// Route 1 : Create a BloodBank using : POST "/api/authBloodBank/createBloodBank" No Login Required
router.post('/createBloodBank',[
    body('B_Email',"Invalid Name").isLength({min: 5}),
    body('B_Password').isLength({min: 5}),
], async(req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array});
    }

    try {
        
        let bloodBank = await BloodBank.findOne({B_Email: req.body.B_Email})
        if(bloodBank){
            return res.status(400).json({error: "User Exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.B_Password, salt);

        bloodBank = await BloodBank.create({
            B_Email:   req.body.B_Email, 
            B_Password:   secPass,
            B_LiscenceNo:   req.body.B_LiscenceNo,
            B_Name:   req.body.B_Name,
            B_Address:   req.body.B_Address,
            B_City:   req.body.B_City,
            B_State:   req.body.B_State,
            B_IsGov:   req.body.B_IsGov,
            B_Contact:   req.body.B_Contact
        });

        const data = {
            user: {
                id: bloodBank.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({authToken})
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
        return res.status(400).json({error: errors.array});
    }

    const {B_Email,B_Password} = req.body;
    try {
        
        let bloodBank = await BloodBank.findOne({B_Email})
        if(!bloodBank){
            return res.status(400).json({error: "PLease try to login with valid credentials"})
        }

        const passwordCompare = await bcrypt.compare(B_Password,bloodBank.B_Password);
        if(!passwordCompare){
            return res.status(400).json({error: "PLease try to login with valid credentials"})
        }

        const data = {
            bloodBank: {
                id: bloodBank.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({authToken})
    } 
    catch (error) {
        console.log(error.message);
        res.json(505).send("Internal Server Error");
    }
})

// Route 3 : Get Logged in donor details using :  POST : "/api/authBloodBank/getBloodBank" : login required
router.post('/getBloodBank',fetchBloodBank, async (req,res)=> {
    try {
        
        let BloodBankId = req.bloodBank.id;
        const user = await BloodBank.findById(BloodBankId).select("-B_Password")
        res.send(user)

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router