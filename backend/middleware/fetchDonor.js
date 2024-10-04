const jwt = require('jsonwebtoken') // used to generate BloodBank auth web token
const JWT_SECRET = "BloodBankisaMERNapp";

const fetchDonor = (req,res,next)=> {

    const authToken = req.header('authToken');
    if(!authToken){
        return res.status(400).json({success: false, error: "PLease authenticate using valid token 11 "});
    }

    try {
        const data = jwt.verify(authToken,JWT_SECRET);
        //console.log('Token data:', data);
        req.user = data.donor;  
        //console.log('req.user:', req.user);
        next();
    } 
    catch (error) {
        res.status(400).send({success: false, error: "Please authenticate using a valid token"})
    }
}

module.exports = fetchDonor;