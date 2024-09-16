import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import Register from "./components/Register";
import DonorProfile from "./components/DonorProfile";
import BloodBankProfile from "./components/BloodBankProfile";
import DonationEntery from "./components/DonationEntery";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/about" element={<BloodBankProfile/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/register" element={<Register/>} />
                    <Route exact path="/services" element={<DonorProfile/>} />
                    <Route exact path="/contact" element={<DonationEntery/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
