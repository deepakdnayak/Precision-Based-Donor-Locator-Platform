import React, { useEffect, useState } from 'react'
import { useBloodBank } from "../context/BloodBankContext";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'

const BloodBankRegister = () => {
    const { registerBloodBank, bloodBankAuthToken } = useBloodBank();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ B_Email: '', B_Password: '', B_Password_C: '' })

    const onChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.B_Password !== credentials.B_Password_C) {
            toast.error("Password do not match.")
            return;
        }

        const result = await registerBloodBank({
            B_Email: credentials.B_Email,
            B_Password: credentials.B_Password
        });

        console.log("authToken = "+bloodBankAuthToken);

        if (!result.success) {
            toast.error('Login Failed!! Please try with correct credentials.')
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
            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <p className="text-center mx-3 mb-0 fs-3"> CREATE BLOOD BANK ACCOUNT </p>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="B_Email">Email address</label>
                    <input 
                        type="email" 
                        id="B_Email" 
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address" 
                        name="B_Email" 
                        value={credentials.B_Email} 
                        onChange={onChange} 
                        required 
                    />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" htmlFor="B_Password">Enter Password</label>
                    <input 
                        type="password" 
                        id="B_Password" 
                        className="form-control form-control-lg"
                        placeholder="Enter password" 
                        name="B_Password" 
                        value={credentials.B_Password} 
                        onChange={onChange} 
                        minLength={5}
                        required 
                    />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" htmlFor="B_Password_C">Confirm Password</label>
                    <input 
                        type="password" 
                        id="B_Password_C" 
                        name="B_Password_C" 
                        value={credentials.B_Password_C} 
                        onChange={onChange} 
                        className="form-control form-control-lg"
                        placeholder="Confirm password" 
                        minLength={5}
                        required 
                    />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >Register</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? 
                        <Link to="/login" className="link-danger">Login</Link></p>
                </div>
            </form>
            <Toaster position="top-center" expand={false} richColors   />
        </div>
    )
}

export default BloodBankRegister;