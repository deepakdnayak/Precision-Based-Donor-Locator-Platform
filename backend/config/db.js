const mongoose = require("mongoose")
const mongooURL = "mongodb://localhost:27017/BloodBank"

const connectToMongo = async() => {
    try {
        mongoose.connect(mongooURL);
        console.log("Connected to Mongoose");    
    } 
    catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectToMongo;