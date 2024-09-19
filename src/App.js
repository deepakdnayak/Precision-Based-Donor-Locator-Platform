import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Navbar from './components/Navbar';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from "./components/Login";
import Register from "./components/Register";
import FindBlood from "./components/FindBlood";
import BloodBankInventory from "./components/BloodBank/BloodBankInventory";

import DonorProfile from "./components/Donor/DonorProfile";
import DonationEntry from "./components/DonationEntry";
import BloodBankProfile from './components/BloodBank/BloodBankProfile'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BloodBankState from "./context/BloodBank/BloodBankState";
import DonorState from "./context/Donor/DonorState";

function App() {
    return (
        <>
            <BloodBankState><DonorState>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/about" element={<About/>} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/services" element={<Services/>} />
                        <Route exact path="/contact" element={<Contact />} />
                        <Route exact path="/donorProfile" element={<DonorProfile />} />
                        <Route exact path="/bloodBankProfile" element={<BloodBankProfile />} />
                        <Route exact path="/bloodBankInventory" element={<BloodBankInventory />} />
                        <Route exact path="/donationEntry" element={<DonationEntry/>} />
                        <Route exact path="/findblood" element={<FindBlood/>} />
                    </Routes>
                </Router>
            </DonorState></BloodBankState>
        </>
    );
}

export default App;
