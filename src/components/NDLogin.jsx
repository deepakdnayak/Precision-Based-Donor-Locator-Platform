import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDonor } from "../context/DonorContext";
import { Toaster, toast } from 'sonner'

const NDLogin = () => {

  const { loginDonor, donorAuthToken } = useDonor();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ D_Email: '', D_Password: '' })


  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginDonor({
      D_Email: credentials.D_Email,
      D_Password: credentials.D_Password
    });


    if (!result.success) {
      toast.error(result.message || "Login failed.")
    }
  }

  // Use useEffect to monitor changes in bloodBankAuthToken
  useEffect(() => {
    if (donorAuthToken) {
      navigate("/donorProfile"); // Redirect when authToken is set
    }
  }, [donorAuthToken, navigate]);

  return (
    <div className="d-flex justify-content-center" style={{ marginTop: "65px", marginBottom: "20px" }}>
      <div className="card shadow-lg border-1 border-secondary-subtle p-4" style={{ width: '25rem' }}>
        <div className="card-body">
          <h3 className="card-title">DONOR LOGIN</h3>
          <p className="card-text">Be part of those people who are ready to save lives.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input type="email" className="form-control border-1 border-secondary-subtle" id="D_Email" name="D_Email" value={credentials.D_Email} onChange={onChange} placeholder="name@example.com" required />
              <label htmlFor="floatingInput">Enter Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control border-1 border-secondary-subtle" id="D_Password" name="D_Password" value={credentials.D_Password} onChange={onChange} placeholder="Password" minLength="5" required />
              <label htmlFor="floatingPassword">Enter Password</label>
            </div>
            <button type="submit" className="btn btn-danger w-100">LOGIN</button>
          </form>
          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-top border-2 border-secondary"></div>
            <span className="mx-3">OR</span>
            <div className="flex-grow-1 border-top border-2 border-secondary"></div>
          </div>
          <div className="btn border border-black w-100 mb-3">Continue with Google</div>
          <Link to="/bloodbanklogin" className="btn btn-outline-danger w-100 mb-3">Blood Bank Login &#8594; </Link>
          {/* <!-- Free Space --> */}
          <p className="text-center mt-2">Are you a new user? <Link to="/donorsignin">Sign In</Link></p>
        </div>
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  )
}

export default NDLogin
