const mongoose = require("mongoose")
const { Schema } = mongoose;

const DonorSchema = new Schema({
    D_Email: {
        type: String,
        required: true
    },
    D_Password: {
        type: String,
        required: true
    },
    D_Fname: {
        type: String,
        required: true
    },
    D_Lname: {
        type: String,
        required: true
    },
    D_Age: {
        type: Number,
        required: true
    },
    D_Gender: {
        type: String,
        required: true
    },
    D_AdharNo: {
        type: Number,
        required: true
    },
    D_BloodGroup: {
        type: String,
        required: true
    },
    D_Address: {
        type: String,
        required: true
    },
    D_City: {
        type: String,
        required: true
    },
    D_State: {
        type: String,
        required: true
    },
    D_Contact: {
        type: Number,
        required: true
    },
    D_LastDonationDate: {
        type: Date,
        required: true
    },
    D_Latitude: {
        type: Number
    },
    D_Longitude: {
        type: Number
    }
})

module.exports = mongoose.model("Donor", DonorSchema)