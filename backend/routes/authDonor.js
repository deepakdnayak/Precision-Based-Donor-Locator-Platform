const express = require('express')
const router = express.Router()
const { validationResult, body } = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
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
            D_Fname:   "default",
            D_Lname:   "default",
            D_Age:   0,
            D_Gender:   "default",
            D_AdharNo:   0,
            D_BloodGroup:   "default",
            D_Address:   "default",
            D_City:   "default",
            D_State:   "default",
            D_Contact:   0,
            D_LastDonationDate:   new Date("2000-01-01T00:00:00Z")
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


// Route 4 : Update a Donor profile using : PUT "/api/authDonor/updateDonor" Login Required
router.put('/updateDonor/:id',fetchDonor, async(req,res)=> {

    const {D_Fname,D_Lname,D_Age,D_Gender,D_AdharNo,D_BloodGroup,D_Address,D_City,D_State,D_Contact,D_LastDonationDate} = req.body;

    try {
        
        // Create a new donor object
        const newDonor = {};
        if (D_Fname) { newDonor.D_Fname = D_Fname }
        if (D_Lname) { newDonor.D_Lname = D_Lname }
        if (D_Age) { newDonor.D_Age = D_Age }
        if (D_Gender) { newDonor.D_Gender = D_Gender }
        if (D_AdharNo) { newDonor.D_AdharNo = D_AdharNo }
        if (D_BloodGroup) { newDonor.D_BloodGroup = D_BloodGroup }
        if (D_Address) { newDonor.D_Address = D_Address }
        if (D_City) { newDonor.D_City = D_City }
        if (D_State) { newDonor.D_State = D_State }
        if (D_Contact) { newDonor.D_Contact = D_Contact }
        if (D_LastDonationDate) { newDonor.D_LastDonationDate = D_LastDonationDate }

        // find the donor to be updated and update it
        let donor = await Donor.findById(req.params.id);
        if (!donor) res.status(404).send("Donor Not Found");

        donor = await Donor.findByIdAndUpdate(req.params.id, {$set: newDonor}, {new: true}).select("-D_Password")
        res.json({ donor })
    } 
    catch (error) {
        console.log(error.message);
        res.json(505).send("Internal Server Error");
    }
})



module.exports = router