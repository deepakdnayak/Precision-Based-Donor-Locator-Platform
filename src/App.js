import './App.css';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Login from "./components/Login";
import Register from "./components/Register";
import FindBlood from "./components/FindBlood";
import BloodBankInventory from "./components/BloodBankInventory";

import DonorProfile from "./components/DonorProfile";
import BloodBankProfile from './components/BloodBankProfile'

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
                        <Route exact path="/about" element={<BloodBankInventory />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/services" element={<DonorProfile />} />
                        <Route exact path="/contact" element={<FindBlood />} />
                        <Route exact path="/donorProfile" element={<DonorProfile />} />
                        <Route exact path="/bloodBankProfile" element={<BloodBankProfile />} />
                    </Routes>
                </Router>
            </DonorState></BloodBankState>
        </>
    );
}

export default App;
