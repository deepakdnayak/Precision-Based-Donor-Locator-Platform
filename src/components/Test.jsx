import React from "react";
import DonateBloodVideo from "../videos/donate_blood.mp4";
import Group from '../images/group.png'
import Mission from '../images/mission.png'
import Goal from '../images/goal.png'
import AutoNumberTicker from "./AutoNumberTicker";
import Footer from "./Footer";

const Test = () => {
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
              <button className="btn btn-danger btn-lg me-3">
                Search Blood
              </button>
              <button className="btn btn-dark btn-lg">Be a donor</button>
            </div>
          </div>
          <div className="col-md-6 text-center d-none d-md-block">
            <video
              src={DonateBloodVideo}
              autoPlay
              muted
              loop
              controls
              className="img-fluid rounded"
              style={{ maxWidth: "100%" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* New Section */}
      <div className="container my-5" style={{paddingTop: '100px'}}>
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="container my-5" style={{paddingTop: '100px'}}>
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>

      
    </div>
  );
};

export default Test;
