import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDonor } from "../context/DonorContext";

const DonorLogin = () => {
    const { loginDonor, donorAuthToken } = useDonor();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ D_Email: '', D_Password: '' })
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const onChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await loginDonor({
            D_Email: credentials.D_Email,
            D_Password: credentials.D_Password
        });

        console.log("Success = " + result.success);
        console.log("authToken = " + donorAuthToken);

        if (!result.success) {
            setToastMessage(result.message || "Login failed.");
            setShowToast(true);
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
    }, [donorAuthToken, navigate]);

    return (
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
                    <p className="text-center mx-3 mb-0 fs-1"> DONOR LOGIN </p>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="D_Email">Email address</label>
                    <input 
                        type="email" 
                        id="D_Email" 
                        name="D_Email"
                        value={credentials.D_Email}
                        onChange={onChange}
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address" 
                        required
                    />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" htmlFor="D_Password">Password</label>
                    <input 
                        type="password" 
                        id="D_Password" 
                        name="D_Password"
                        value={credentials.D_Password}
                        onChange={onChange}
                        className="form-control form-control-lg"
                        placeholder="Enter password" 
                        required
                    />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                        className="link-danger">Register</Link></p>
                </div>
            </form>
        </div>
    )
}

export default DonorLogin