import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import LoginType from './components/LoginType';
import About from './components/About';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/login" element={<LoginType />} />
                    <Route exact path="/about" element={<About/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
