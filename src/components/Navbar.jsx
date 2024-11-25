import React, { useContext, useState, useEffect } from "react";
import Logo from "../images/NavLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useBloodBank } from "../context/BloodBankContext";
import { useDonor } from "../context/DonorContext";

const Navbar = () => {
  const { bloodBankAuthToken, logoutBB } = useBloodBank();
  const { donorAuthToken, logoutD } = useDonor();
  const navigate = useNavigate();

  const [navBackground, setNavBackground] = useState(false);

  const handleLogout = () => {
    logoutBB();
    logoutD();
    navigate("/"); // Redirect to home or login page
  };

  const handleProfileChange = () => {
    if (bloodBankAuthToken) {
      navigate("/bloodBankProfile");
    } else if (donorAuthToken) {
      navigate("/donorProfile");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        navBackground ? "bg-danger-subtle text-white shadow" : ""
      }`}
    >
      <div className="container-fluid mx-2">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="Blood Donate Logo"
            width="50"
            height="40"
            className="d-inline-block align-text-top"
          />
          Blood Donate
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          {(!bloodBankAuthToken && !donorAuthToken) ? (
            <form className="d-flex" role="search">
              <Link to="/donorlogin" className="btn btn-danger ms-2">
                Login
              </Link>
              <Link to="/donorsignin" className="btn btn-danger ms-2">
                Register
              </Link>
            </form>
          ) : (
            <form className="d-flex" role="search">
              <div onClick={handleLogout} className="btn btn-danger ms-2">
                Logout
              </div>
              <div onClick={handleProfileChange} className="btn btn-danger ms-2">
                Profile
              </div>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
