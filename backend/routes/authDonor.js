const express = require('express')
const router = express.Router()
const { query,validationResult, body } = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const bcrypt = require('bcrypt') // used to hash passwords
const jwt = require('jsonwebtoken') // used to generate BloodBank auth web token
const JWT_SECRET = "BloodBankisaMERNapp";

let fetchDonor = require('../middleware/fetchDonor')

const Donor = require("../models/Donor")


// Route 1 : Create a Donor using : POST "/api/authDonor/createDonor" No Login Required
router.post('/createDonor',[
    body('D_Email',"Invalid Name").isLength({min: 5}),
    body('D_Password').isLength({min: 5}),
], async(req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array});
    }

    try {
        
        let donor = await Donor.findOne({D_Email: req.body.D_Email})
        if(donor){
            return res.status(400).json({error: "User Exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.D_Password, salt);

        donor = await Donor.create({
            D_Email:   req.body.D_Email,
            D_Password:   secPass,
            D_Fname:   req.body.D_Fname,
            D_Lname:   req.body.D_Lname,
            D_Age:   req.body.D_Age,
            D_Gender:   req.body.D_Gender,
            D_AdharNo:   req.body.D_AdharNo,
            D_BloodGroup:   req.body.D_BloodGroup,
            D_Address:   req.body.D_Address,
            D_City:   req.body.D_City,
            D_State:   req.body.D_State,
            D_Contact:   req.body.D_Contact,
            D_LastDonationDate:   new Date(req.body.D_LastDonationDate)
        });

        const data = {
            user: {
                id: donor.id
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

// Route 2 : Authenticate a Donor using POST : "/api/authDonor/login" No login required
router.post('/login',[
    body('D_Email',"Invalid Name").isLength({min: 5}),
    body('D_Password').isLength({min: 5}),
], async (req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array});
    }

    const {D_Email,D_Password} = req.body;
    try {
        
        let donor = await Donor.findOne({D_Email})
        if(!donor){
            return res.status(400).json({error: "PLease try to login with valid credentials"})
        }

        const passwordCompare = await bcrypt.compare(D_Password,donor.D_Password);
        if(!passwordCompare){
            return res.status(400).json({error: "PLease try to login with valid credentials"})
        }

        const data = {
            donor: {
                id: donor.id
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

// Route 3 : Get Logged in donor details using :  POST : "/api/authDonor/getDonor" : login required
router.post('/getDonor',fetchDonor, async (req,res)=> {
    try {
        
        let DonorId = req.user.id;
        const user = await Donor.findById(DonorId).select("-D_Password")
        res.send(user)

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



module.exports = router