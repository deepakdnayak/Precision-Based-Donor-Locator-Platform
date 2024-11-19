const mongoose = require("mongoose")
const { Schema } = mongoose;

const BloodBankInventorySchema = new Schema({
    BloodBankId : {
        type: Schema.Types.ObjectId, 
        ref: "BloodBank",
        required: true
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
    }
})

module.exports = mongoose.model("BloodBankInventory", BloodBankInventorySchema)