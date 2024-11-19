const express = require('express')
const router = express.Router()
const { body } = require('express-validator')  
let fetchDonor = require('../middleware/fetchDonor')
const { createDonor, loginDonor, getDonor, updateDonor } = require('../controllers/donorControllers')


// Route 1 : Create a Donor using : POST "/api/authDonor/createDonor" No Login Required
router.post('/createDonor',[
    body('D_Email',"Invalid Name").isLength({min: 5}),
    body('D_Password').isLength({min: 5}),
], createDonor );

// Route 2 : Authenticate a Donor using POST : "/api/authDonor/login" No login required
router.post('/login',[
    body('D_Email',"Invalid Name").isLength({min: 5}),
    body('D_Password').isLength({min: 5}),
], loginDonor );

// Route 3 : Get Logged in donor details using :  POST : "/api/authDonor/getDonor" : login required
router.post('/getDonor',fetchDonor, getDonor );

// Route 4 : Update a Donor profile using : PUT "/api/authDonor/updateDonor" Login Required
router.put('/updateDonor/:id',fetchDonor, updateDonor );

module.exports = router