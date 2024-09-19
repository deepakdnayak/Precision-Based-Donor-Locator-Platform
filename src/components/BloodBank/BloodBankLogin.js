import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BloodBankContext from '../../context/BloodBank/BloodBankContext'

const BloodBankLogin = () => {
    const { loginBloodBank, bloodBankAuthToken } = useContext(BloodBankContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ B_Email: '', B_Password: '' });
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const onChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await loginBloodBank({
            B_Email: credentials.B_Email,
            B_Password: credentials.B_Password
        });

        console.log("Success = "+result.success);
        console.log("authToken = " + bloodBankAuthToken);

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
        if (bloodBankAuthToken) {
            console.log("authToken = " + bloodBankAuthToken);
            navigate("/bloodBankProfile"); // Redirect when authToken is set
        }
    }, [bloodBankAuthToken, navigate]); // Runs only when bloodBankAuthToken changes

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
                    <p className="text-center mx-3 mb-0 fs-1"> BLOOD BANK LOGIN </p>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="B_Email">Email address</label>
                    <input 
                        type="email" 
                        id="B_Email" 
                        name="B_Email" 
                        value={credentials.B_Email} 
                        onChange={onChange} 
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address" 
                        required 
                    />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" htmlFor="B_Password">Password</label>
                    <input 
                        type="password" 
                        id="B_Password" 
                        name="B_Password"
                        value={credentials.B_Password}
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

export default BloodBankLogin