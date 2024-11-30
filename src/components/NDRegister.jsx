import React, { useEffect, useState } from 'react'
import { useDonor } from "../context/DonorContext";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'

const NDRegister = () => {
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

        if (!result.success) {
            toast.error("Registration failed");
        }
    }

    // Use useEffect to monitor changes in bloodBankAuthToken
    useEffect(() => {
        if (donorAuthToken) {
            navigate("/donorProfile"); // Redirect when authToken is set
        }
    }, [donorAuthToken, navigate]); // Runs only when bloodBankAuthToken changes 

  return (
    <div  className="d-flex justify-content-center" style={{ marginTop: "40px", marginBottom: "20px" }}>
      <div className="card shadow-lg border-1 border-secondary-subtle p-4" style={{width: '25rem'}}>
        <div className="card-body">
            <h3 className="card-title">DONOR SIGN IN</h3>
            <p className="card-text">Be part of those people who are ready to save lives.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control border-1 border-secondary-subtle" id="D_Email" name="D_Email" value={credentials.D_Email} onChange={onChange} placeholder="name@example.com" required/>
                    <label htmlFor="D_Email">Enter Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control border-1 border-secondary-subtle" id="D_Password" name="D_Password" value={credentials.D_Password} onChange={onChange} placeholder="Password" minLength="5" required/>
                    <label htmlFor="D_Password">Enter Password</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password" className="form-control border-1 border-secondary-subtle" id="D_Password_C" name="D_Password_C" value={credentials.D_Password_C} onChange={onChange} placeholder="Password" minLength="5" required/>
                    <label htmlFor="D_Password_C">Confirm Password</label>
                </div>
                <button type="submit" className="btn btn-danger w-100">SIGN IN</button>
            </form>
            <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1 border-top border-2 border-secondary"></div>
                <span className="mx-3">OR</span>
                <div className="flex-grow-1 border-top border-2 border-secondary"></div>
            </div>
            <div className="btn border border-black w-100 mb-3">Continue with Google</div>
            <Link to="/bloodbanksignin" className="btn btn-outline-danger w-100 mb-3">Blood Bank Sign In &#8594; </Link>
            {/* <!-- Free Space --> */}
            <p className="text-center mt-2">Already have an account? <Link to="/donorlogin">Log In</Link></p>
        </div>
    </div>
    <Toaster position="top-center" expand={false} richColors   />
    </div>
  )
}

export default NDRegister
