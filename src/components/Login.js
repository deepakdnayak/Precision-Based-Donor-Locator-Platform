import React, { useState } from 'react';
import DonorLogin from './Donor/DonorLogin';
import BloodBankLogin from './BloodBank/BloodBankLogin';

/**
 * This component renders the login page for donors and blood banks.
 * It allows users to switch between donor and blood bank login forms.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Login = () => {
  const [mode, setMode] = useState('donor'); // Initial login mode (donor)

  /**
   * Handles the click event on the "Donor" and "Blood Bank" buttons.
   * Updates the `mode` state to switch between login forms.
   *
   * @param {string} newMode The new login mode ("donor" or "bloodBank").
   */
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              {/* Conditionally render login form based on mode */}
              {mode === 'donor' ? <DonorLogin /> : <BloodBankLogin />}

              <div className="container mt-3 ">
                <div className="row text-center">
                  <div
                    className={`col btn rounded-0 py-2 border-end border-${
                      mode === 'donor' ? 'bottom' : 'top'
                    }`}
                    onClick={() => handleModeChange('donor')}
                  >
                    Donor
                  </div>
                  <div
                    className={`col btn rounded-0 py-2 border-start border-${
                      mode === 'bloodBank' ? 'bottom' : 'top'
                    }`}
                    onClick={() => handleModeChange('bloodBank')}
                  >
                    Blood Bank
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;