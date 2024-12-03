const { validationResult } = require('express-validator')  // used to check if the entries are valid and if they follow the required constraints
const bcrypt = require('bcrypt') // used to hash passwords
const jwt = require('jsonwebtoken') // used to generate BloodBank auth web token
const JWT_SECRET = "BloodBankisaMERNapp";
const Donor = require("../models/Donor")
const mongoose = require('mongoose')


const createDonor = async(req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success: false, error: errors.array });
    }

    try {
        
        let donor = await Donor.findOne({D_Email: req.body.D_Email})
        if(donor){
            return res.status(409).json({ success: false, error: "User Exists"})
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
            D_LastDonationDate:   new Date("2000-01-01T00:00:00Z"),
            location: { type: "Point", coordinates: [0.0, 0.0] }
        });

        const data = {
            user: {
                id: donor.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ success: true, authToken})
    } 
    catch (error) {
        console.log(error.message);
        res.json(500).send("Internal Server Error");
    }
}

const loginDonor = async (req,res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success: false, error: errors.array});
    }

    const {D_Email,D_Password} = req.body;
    try {
        
        let donor = await Donor.findOne({D_Email})
        if(!donor){
            return res.status(400).json({ success: false, error: "PLease try to login with valid credentials"})
        }

        const passwordCompare = await bcrypt.compare(D_Password,donor.D_Password);
        if(!passwordCompare){
            return res.status(400).json({ success: false, error: "PLease try to login with valid credentials"})
        }

        const data = {
            donor: {
                id: donor.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ success: true, authToken})
    } 
    catch (error) {
        console.log(error.message);
        res.json(500).send("Internal Server Error");
    }
}

const getDonor = async (req,res)=> {
    try {
        
        let DonorId = req.user.id;
        console.log(req.user.id);
        const user = await Donor.findById(DonorId).select("-D_Password")
        if(user) res.send(user)
        else res.json({success: false})

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal server error"});
    }
}

const updateDonor = async (req, res) => {
    const {
        D_Fname,
        D_Lname,
        D_Age,
        D_Gender,
        D_AdharNo,
        D_BloodGroup,
        D_Address,
        D_City,
        D_State,
        D_Contact,
        D_LastDonationDate,
        D_Latitude,
        D_Longitude,
    } = req.body;

    try {
        // Validate donor ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, error: "Invalid donor ID" });
        }

        // Create a new donor object
        const newDonor = {};
        if (D_Fname) newDonor.D_Fname = D_Fname;
        if (D_Lname) newDonor.D_Lname = D_Lname;
        if (D_Age) newDonor.D_Age = D_Age;
        if (D_Gender) newDonor.D_Gender = D_Gender;
        if (D_AdharNo) newDonor.D_AdharNo = D_AdharNo;
        if (D_BloodGroup) newDonor.D_BloodGroup = D_BloodGroup;
        if (D_Address) newDonor.D_Address = D_Address;
        if (D_City) newDonor.D_City = D_City;
        if (D_State) newDonor.D_State = D_State;
        if (D_Contact) newDonor.D_Contact = D_Contact;
        if (D_LastDonationDate) newDonor.D_LastDonationDate = D_LastDonationDate;

        // Handle GeoJSON location field
        if (D_Latitude && D_Longitude) {
            newDonor.location = {
                type: "Point",
                coordinates: [D_Longitude, D_Latitude], // Longitude first, then Latitude
            };
        }

        // Find and update the donor
        let donor = await Donor.findById(req.params.id);
        if (!donor) {
            return res.status(404).json({ success: false, error: "Donor not found" });
        }

        donor = await Donor.findByIdAndUpdate(
            req.params.id,
            { $set: newDonor },
            { new: true } // Return the updated document
        ).select("-D_Password"); // Exclude the password field from the response

        return res.json({ success: true, donor });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = { createDonor, loginDonor, getDonor, updateDonor };