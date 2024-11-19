const mongoose = require("mongoose")
const { Schema } = mongoose;

const BloodBankSchema = new Schema({
    B_Email: {
        type: String,
        required: true
    },
    B_Password: {
        type: String,
        required: true
    },
    B_LiscenceNo: {
        type: String,
        required: true
    },
    B_Name: {
        type: String,
        required: true
    },
    B_Address: {
        type: String,
        required: true
    },
    B_City: {
        type: String,
        required: true
    },
    B_State: {
        type: String,
        required: true
    },
    B_IsGov: {
        type: Boolean,
        required: true
    },
    B_Contact: {
        type: Number,
        required: true
    },
    B_InventoryAPI: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("BloodBank", BloodBankSchema)
