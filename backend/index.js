const connectToMongo = require('./db')
const  express = require("express")
const cors = require("cors")

connectToMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

app.use('/api/authDonor', require('./routes/authDonor'))
app.use('/api/authBloodBank', require('./routes/authBloodBank'))

app.listen(port, ()=> {
    console.log(`BloodBank backend listening at http://localhost:${port}`);
})