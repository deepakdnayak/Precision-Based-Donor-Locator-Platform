import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import Register from "./components/Register";
import DonorProfile from "./components/DonorProfile";
import BloodBankInventory from "./components/BloodBankInventory";
import FindBlood from "./components/FindBlood";
import Home from "./components/Home";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/about" element={<BloodBankInventory/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/register" element={<Register/>} />
                    <Route exact path="/services" element={<DonorProfile/>} />
                    <Route exact path="/contact" element={<FindBlood/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
