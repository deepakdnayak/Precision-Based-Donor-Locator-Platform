import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import BloodBankProfile from './components/BloodBankProfile';
import BloodBankInventory from './components/BloodBankInventory';
import FindBlood from './components/FindBlood';
import DonorProfile from './components/DonorProfile';
import NDLogin from './components/NDLogin'; 
import NHome from './components/NHome';
import NDRegister from './components/NDRegister';
import NBRegister from './components/NBRegister';
import NBLogin from './components/NBLogin';
import Test from './components/Test';

const App = ()=> {
  return (
    <>
      <Router future={{ v7_relativeSplatPath: true }}>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<NHome/>}/>
          <Route exact path="/bloodBankProfile" element={<BloodBankProfile />} />
          <Route exact path="/donorProfile" element={<DonorProfile />} />
          <Route exact path="/bloodBankInventory" element={<BloodBankInventory />} />
          <Route exact path="/findblood" element={<FindBlood/>} />
          <Route exact path="/test" element={<Test/>} />
          <Route exact path="/donorlogin" element={<NDLogin/>} />
          <Route exact path="/donorsignin" element={<NDRegister/>} />
          <Route exact path="/bloodbanklogin" element={<NBLogin/>} />
          <Route exact path="/bloodbanksignin" element={<NBRegister/>} />
        </Routes><></>
      </Router>
    </>
  )
}
export default App;


