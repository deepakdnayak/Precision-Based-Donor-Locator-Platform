const mongoose = require("mongoose")
const mongooURL = "mongodb+srv://deepakdnayak2004:deepakmongo@deepakcluster.ca3js.mongodb.net/BloodBank?retryWrites=true&w=majority&appName=DeepakCluster"
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