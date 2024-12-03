import React, { useEffect } from "react";
import DonateBloodVideo from "../videos/donate_blood.mp4";
import Group from '../images/group.png'
import Mission from '../images/mission.png'
import Goal from '../images/goal.png'
import AutoNumberTicker from "./AutoNumberTicker";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner'

const NHome = () => {

  useEffect(() => {
    // Check if signInSuccess flag exists in localStorage
    if (localStorage.getItem('signInSuccess') === 'true') {
        toast.success("Registration successful!");
        toast.success("Please Login to access profile");
        localStorage.removeItem('signInSuccess'); // Remove the flag after showing the toast
    }
  }, []);

  return (
    <div className="block" style={{ marginTop: "150px" }}>
      <div className="container-fluid p-5" style={{ backgroundColor: "#fff" }}>
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold">
              Donate <span className="text-danger">Blood</span>,<br />
              Give a Smile to Someone!
            </h1>
            <p className="mt-3 text-muted">
              Donating blood is a simple act of kindness that can save up to
              three lives in just one visit. Your generous contribution could be
              the lifeline someone desperately needs today—be a hero, donate
              blood!
            </p>
            <div className="mt-4">
              <div className="d-flex flex-wrap text-start text-lg-start text-center justify-content-lg-start justify-content-center">
                <Link to="/findBlood" className="btn btn-danger btn-lg me-3 mt-2">
                  Search Blood
                </Link>
                <Link to="/donorlogin" className="btn btn-dark btn-lg mt-2">
                  Be a donor
                </Link>
              </div>
            </div>


          </div>
          <div className="col-md-6 text-center d-none d-md-block">
            <video
              src={DonateBloodVideo}
              autoPlay
              muted
              loop
              className="img-fluid rounded"
              style={{ maxWidth: "100%" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* New Section */}
      <div className="container my-5" style={{paddingTop: '100px'}} id="siteAbout">
        <div className="text-center mb-4">
          <h1 className="text-uppercase text-danger fw-bold mb-4">
            A Short Brief About Us
          </h1>
          <h3 className="fw-bold">About Donor Locator</h3>
        </div>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div className="mb-3">
                <img
                  src={Group}
                  alt="Who We Are"
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid"
                />
              </div>
              <h5 className="fw-bold">Who We Are</h5>
              <p className="text-muted">
              We are a dedicated platform connecting those
              in need of blood with eligible and ready donors,
              streamlining the life-saving donation process.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div className="mb-3">
                <img
                  src={Mission}
                  alt="Mission"
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid"
                />
              </div>
              <h5 className="fw-bold">Mission</h5>
              <p className="text-muted">
              Our mission is to save lives by enabling quick and 
              reliable access to blood donors through advanced 
              technology and community support.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div className="mb-3">
                <img
                  src={Goal}
                  alt="Our Goal"
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid"
                />
              </div>
              <h5 className="fw-bold">Our Goal</h5>
              <p className="text-muted">
              We aim to build a comprehensive and accessible donor 
              network, ensuring timely availability of blood for 
              everyone in need.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="container my-5" style={{paddingTop: '100px', paddingBottom: '100px'}} id="siteServices">
        <div className="text-center mb-4">
          <h1 className="text-uppercase text-black fw-bold mb-4">
            Our Connections
          </h1>
        </div>
        <div className="row text-center">
          <div className="col-md-6 mb-4">
            <div className="p-4">
              <div className="mb-3">
                <AutoNumberTicker limit={10} fastInterval={100} slowInterval={1000} />
              </div>
              <h2 className="fw-bold">Blood Banks</h2>
              <p className="text-muted">
              Discover our extensive network of blood banks committed 
              to ensuring a steady and reliable supply for those in need.
              </p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="p-4">
              <div className="mb-3">
                <AutoNumberTicker limit={26} fastInterval={100} slowInterval={1000} />
              </div>
              <h2 className="fw-bold">Donors</h2>
              <p className="text-muted">
              Join our growing community of compassionate donors ready 
              to make a difference, one life at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-5 bg-secondary-subtle" id="appfooter">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-danger">Donor Locator</h5>
            <p className="text-muted">
              A platform that bridges the gap between blood donors and those in
              need, helping save lives across communities.
            </p>
          </div>
          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-muted text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted text-decoration-none">
                  Donate Blood
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/findblood" className="text-muted text-decoration-none">
                  Search Blood
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="text-muted mb-2">
              <i className="bi bi-geo-alt text-danger me-2"></i>
              1234 Blood Donor Locator Karnataka, Mangalore, India
            </p>
            <p className="text-muted mb-2">
              <i className="bi bi-envelope text-danger me-2"></i>
              support@donorlocator.com
            </p>
            <p className="text-muted">
              <i className="bi bi-telephone text-danger me-2"></i>
              +91 9844416474
            </p>
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="text-center mt-4">
          <a href="#facebook" className="text-danger me-3">
            <i className="bi bi-facebook fs-3"></i>
          </a>
          <a href="#twitter" className="text-danger me-3">
            <i className="bi bi-twitter fs-3"></i>
          </a>
          <a href="#instagram" className="text-danger">
            <i className="bi bi-instagram fs-3"></i>
          </a>
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">
            © {new Date().getFullYear()} Donor Locator. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
    <Toaster position="top-center" expand={true} richColors   />
    </div>
  );
};

export default NHome;
