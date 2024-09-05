const jwt = require('jsonwebtoken') // used to generate BloodBank auth web token
const JWT_SECRET = "BloodBankisaMERNapp";

const fetchBloodBank = (req,res,next)=> {

    const authToken = req.header('authToken');
    if(!authToken){
        return res.status(401).json({error: "PLease authenticate using valid token 11 "});
    }

    try {
        const data = jwt.verify(authToken,JWT_SECRET);
        console.log('Token data:', data);
        req.user = data.bloodBank;  
        console.log('req.user:', req.user);
        next();
    } 
    catch (error) {
        res.status(400).send({error: "Please authenticate using a valid token 22 "})
    }
}

module.exports = fetchBloodBank;