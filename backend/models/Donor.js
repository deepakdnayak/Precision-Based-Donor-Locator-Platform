const mongoose = require("mongoose");
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
    location: {
        type: {
            type: String, // This should always be "Point"
            enum: ["Point"], // Enforce GeoJSON "Point" type
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers: [longitude, latitude]
            required: true
        }
    }
});

// Create a 2dsphere index on the location field for geospatial queries
DonorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Donor", DonorSchema);
