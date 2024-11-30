import React, { useEffect, useState } from 'react'
import { useBloodBank } from "../context/BloodBankContext";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'

const NBRegister = () => {
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

        if (!result.success) {
            toast.error('Login Failed!! Please try with correct credentials.')
        }
    }

    // Use useEffect to monitor changes in bloodBankAuthToken
    useEffect(() => {
        if (bloodBankAuthToken) {
            navigate("/bloodBankProfile"); // Redirect when authToken is set
        }
    }, [bloodBankAuthToken, navigate]); // Runs only when bloodBankAuthToken changes

  return (
    <div  className="d-flex justify-content-center" style={{ marginTop: "40px", marginBottom: "20px" }}>
      <div className="card shadow-lg border-1 border-secondary-subtle p-4" style={{width: '25rem'}}>
        <div className="card-body">
            <h3 className="card-title">BLOODBANK SIGN IN</h3>
            <p className="card-text">Be part of those people who are ready to save lives.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control border-1 border-secondary-subtle" id="B_Email" name="B_Email" value={credentials.B_Email} onChange={onChange} placeholder="name@example.com" required/>
                    <label htmlFor="floatingInput">Enter Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control border-1 border-secondary-subtle" id="B_Password" name="B_Password" value={credentials.B_Password} onChange={onChange} minLength={5} placeholder="Password" required/>
                    <label htmlFor="floatingPassword">Enter Password</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password" className="form-control border-1 border-secondary-subtle" id="B_Password_C" name="B_Password_C" value={credentials.B_Password_C} onChange={onChange}  placeholder="Password" minLength="5" required/>
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-danger w-100">SIGN IN</button>
            </form>
            <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1 border-top border-2 border-secondary"></div>
                <span className="mx-3">OR</span>
                <div className="flex-grow-1 border-top border-2 border-secondary"></div>
            </div>
            <div className="btn border border-black w-100 mb-3">Continue with Google</div>
            <Link to="/donorsignin" className="btn btn-outline-danger w-100 mb-3">Donor Sign In &#8594; </Link>
            {/* <!-- Free Space --> */}
            <p className="text-center mt-2">Already have an account? <Link to="/bloodbanklogin">Log In</Link></p>
        </div>
    </div>
    <Toaster position="top-center" expand={false} richColors   />
    </div>
  )
}

export default NBRegister
