import React from 'react'
import { Link } from 'react-router-dom'

const DonorLogin = () => {
    return (
        <div>
            <div className="my-4">
                <p className="text-center mx-3 mb-0 fs-1"> DONOR LOGIN </p>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">Email address</label>
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" />
            </div>

            <div data-mdb-input-init className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">Password</label>
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" />
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                    className="link-danger">Register</Link></p>
            </div>
        </div>
    )
}

export default DonorLogin