import React, { useEffect, useState } from 'react'
import { useDonor } from "../context/DonorContext";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'

const DonorRegister = () => {
    const { registerDonor, donorAuthToken } = useDonor();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ D_Email: "", D_Password: "", D_Password_C: "" });

    const onChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.D_Password !== credentials.D_Password_C) {
            toast.error("Password do not match")
            return;
        }

        const result = await registerDonor({
            D_Email: credentials.D_Email,
            D_Password: credentials.D_Password
        });

        console.log("authToken = "+donorAuthToken);

        if (!result.success) {
            toast.error("Registration failed");
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
        <div>
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
                        placeholder="Enter password" minLength={5} required />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" htmlFor="D_Password_C">Confirm Password</label>
                    <input type="password" id="D_Password_C" name="D_Password_C" value={credentials.D_Password_C} onChange={onChange} className="form-control form-control-lg"
                        placeholder="Confirm password" minLength={5} required />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg me-3"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >Register</button>
                </div>
            </form>
            <Toaster position="top-center" expand={false} richColors   />
        </div>
    )
}

export default DonorRegister