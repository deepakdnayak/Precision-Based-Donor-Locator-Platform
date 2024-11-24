import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BloodBankProfile from './components/BloodBankProfile';
import BloodBankInventory from './components/BloodBankInventory';
import FindBlood from './components/FindBlood';
import DonorProfile from './components/DonorProfile';
import Test from './components/Test';

const App = ()=> {
  return (
    <>
      <Router future={{ v7_startTransition: true }}>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/bloodBankProfile" element={<BloodBankProfile />} />
          <Route exact path="/donorProfile" element={<DonorProfile />} />
          <Route exact path="/bloodBankInventory" element={<BloodBankInventory />} />
          <Route exact path="/findblood" element={<FindBlood/>} />
          <Route exact path="/test" element={<Test/>} />
        </Routes><></>
      </Router>
    </>
  )
}
export default App;


