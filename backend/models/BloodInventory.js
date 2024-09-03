const mongoose = require("mongoose")
const { Schema } = mongoose;

const BloodInventorySchema = new Schema({
    BloodBankID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodBank'
    },
    Aplus: {
        type: Number,
        required: true
    },
    Amin: {
        type: Number,
        required: true
    },
    Bplus: {
        type: Number,
        required: true
    },
    Bmin: {
        type: Number,
        required: true
    },
    Oplus: {
        type: Number,
        required: true
    },
    Omin: {
        type: Number,
        required: true
    },
    ABplus: {
        type: Number,
        required: true
    },
    ABmin: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("BloodInventory", BloodInventorySchema)