import React, { useState } from 'react'
import { BloodBankContext } from '../context/BloodBank/BloodBankContext'

const BloodBankRegister = () => {

    const { registerBloodBank } = 
    const [credentials, setCredentials] = useState(null)

    const onChange = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e)=> {
        
         
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-4">
                <p className="text-center mx-3 mb-0 fs-3"> CREATE BLOOD BANK ACCOUNT </p>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="B_Email">Email address</label>
                <input type="email" id="B_Email" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" name="B_Email" value={credentials.B_Email} onChange={onChange} required />
            </div>

            <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" htmlFor="B_Password">Enter Password</label>
                <input type="password" id="B_Password" className="form-control form-control-lg"
                    placeholder="Enter password" name="B_Password" value={credentials.B_Password} onChange={onChange} required />
            </div>

            <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" htmlFor="B_Password_C">Confirm Password</label>
                <input type="password" id="B_Password_C" onChange={onChange} className="form-control form-control-lg"
                    placeholder="Confirm password" required />
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >Register</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                    className="link-danger">Login</a></p>
            </div>
        </form>
    )
}

export default BloodBankRegister