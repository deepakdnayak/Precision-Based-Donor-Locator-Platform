const connectToMongo = require('./config/db')
const express = require("express")
const cors = require("cors")
const cron = require("node-cron");
const axios = require("axios");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use('/api/authDonor', require('./routes/authDonor'))
app.use('/api/authBloodBank', require('./routes/authBloodBank'))
app.use('/api/searchBlood', require('./routes/searchBlood'))

// Function to update inventories
const updateInventories = async () => {
    try {
        console.log("Updating inventories...");
        const response = await axios.get("http://localhost:5000/api/searchBlood/update-inventories");
        console.log("Inventories updated successfully:", response.data);
    } catch (error) {
        console.error("Error updating inventories:", error.message);
    }
};

// Schedule the /update-inventories endpoint to run every 5 minutes
cron.schedule("*/5 * * * *", updateInventories);

app.listen(port, ()=> {
    console.log(`BloodBank backend listening at http://localhost:${port}`);
})