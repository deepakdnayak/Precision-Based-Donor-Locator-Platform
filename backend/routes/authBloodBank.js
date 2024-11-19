const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
let fetchBloodBank = require('../middleware/fetchBloodBank')
const { createBloodBank, loginBloodBank, getBloodBank, updateBloodBank } = require('../controllers/bloodBankControllers')

// Route 1 : Create a BloodBank using : POST "/api/authBloodBank/createBloodBank" No Login Required
router.post('/createBloodBank',[
    body('B_Email',"Invalid Name").isLength({min: 5}),
    body('B_Password').isLength({min: 5}),
], createBloodBank);

// Route 2 : Authenticate a BloodBank using POST : "/api/authBloodBank/login" No login required
router.post('/login',[
    body('B_Email',"Invalid Name").isLength({min: 5}),
    body('B_Password').isLength({min: 5}),
], loginBloodBank);

// Route 3 : Get Logged in donor details using :  POST : "/api/authBloodBank/getBloodBank" : login required
router.post('/getBloodBank',fetchBloodBank, getBloodBank );

// Route 4 : Update a BloodBank detail using : PUT "/api/authBloodBank/updateBloodBank" Login Required
router.put('/updateBloodBank/:id',fetchBloodBank, updateBloodBank );

module.exports = router