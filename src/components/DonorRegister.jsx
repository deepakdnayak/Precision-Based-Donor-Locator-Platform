import React, { useEffect, useState } from 'react'
import { useDonor } from "../context/DonorContext";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const clientId = "556125669291-8qfdc0a7pkh5kih7clrls4p1v3963keg.apps.googleusercontent.com";

const DonorRegister = () => {
    const { registerDonor, donorAuthToken } = useDonor();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ D_Email: "", D_Password: "", D_Password_C: "" });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('')

    const onSuccess = (response) => {
        console.log('Login Success: ', response.profileObj);
        // Send response.tokenId to backend for verification
    };
    
    const onFailure = (response) => {
        console.log('Login Failed: ', response);
        if (response.error === 'popup_closed_by_user') {
            alert('Login process was interrupted. Please try again.');
        }
    };

    const onChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.D_Password !== credentials.D_Password_C) {
            setToastMessage("Password do not match");
            setShowToast(true);
            return;
        }

        const result = await registerDonor({
            D_Email: credentials.D_Email,
            D_Password: credentials.D_Password
        });

        console.log("authToken = "+donorAuthToken);

        if (!result.success) {
            setToastMessage("Registration failed");
            setToastMessage(true);
        }
        else {
            setShowToast(false);
        }
    }

    // Use useEffect to monitor changes in bloodBankAuthToken
    useEffect(() => {
        if (donorAuthToken) {
            console.log("authToken = " + donorAuthToken);
            navigate("/donorProfile"); // Redirect when authToken is set
        }
    }, [donorAuthToken, navigate]); // Runs only when bloodBankAuthToken changes 

    return (
        <GoogleOAuthProvider clientId="556125669291-8qfdc0a7pkh5kih7clrls4p1v3963keg.apps.googleusercontent.com">
        <div>
            {showToast && (
                <div className="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" onClick={() => setShowToast(false)}></button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <p className="text-center mx-3 mb-0 fs-3"> CREATE DONOR ACCOUNT </p>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="D_Email">Email address</label>
                    <input type="email" id="D_Email" name="D_Email" value={credentials.D_Email} onChange={onChange} className="form-control form-control-lg"
                        placeholder="Enter a valid email address" required />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" htmlFor="D_Password">Enter Password</label>
                    <input type="password" id="D_Password" name="D_Password" value={credentials.D_Password} onChange={onChange} className="form-control form-control-lg"
                        placeholder="Enter password" required />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" htmlFor="D_Password_C">Confirm Password</label>
                    <input type="password" id="D_Password_C" name="D_Password_C" value={credentials.D_Password_C} onChange={onChange} className="form-control form-control-lg"
                        placeholder="Confirm password" required />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg me-3"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >Register</button>
                        <GoogleLogin
                            className="border border-secondary"
                            clientId={clientId}
                            buttonText="Login with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                </div>
            </form>
        </div>
        </GoogleOAuthProvider>
    )
}

export default DonorRegister