import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
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
                <a href="#about" className="text-muted text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#donate" className="text-muted text-decoration-none">
                  Donate Blood
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="text-muted mb-2">
              <i className="bi bi-geo-alt text-danger me-2"></i>
              1234 Blood Donor St., City, Country
            </p>
            <p className="text-muted mb-2">
              <i className="bi bi-envelope text-danger me-2"></i>
              support@donorlocator.com
            </p>
            <p className="text-muted">
              <i className="bi bi-telephone text-danger me-2"></i>
              +1 (234) 567-890
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
  );
};

export default Footer;
