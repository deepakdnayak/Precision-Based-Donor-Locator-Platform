const mongoose = require("mongoose")
const { Schema } = mongoose;

const DonationSchema = new Schema({
    BloodBankID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodBank'
    },
    DonorID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor'
    },
    Blood_QTY: {
        type: Number,
        required: true
    },
    Blood_Group: {
        type: String,
        required: true
    },
    Blood_Weight: {
        type: Number,
        required: true
    },
    Donation_Date: {
        type: Date,
        required: true
    },
    Blood_Expiry_Date: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model("Donation", DonationSchema)