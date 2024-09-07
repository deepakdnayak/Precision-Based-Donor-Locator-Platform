import React from 'react'
import User from '../images/user.jpg'
import BloodBank from '../images/bloodbank.png'
import { Link } from 'react-router-dom';

const LoginType = () => {
    return (
        <div className="container text-center mt-5">
            <p className="fs-1 mb-5">LOGIN TYPE</p>
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center my-3">
                    {/* Hospital Card */}
                    <Link to="/login/hospital">
                        <div className="card p-5 login-card" style={{ width: '18rem' }}>
                            <img src={User} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Donor Login</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-6 d-flex justify-content-center my-3">
                    <Link to="/login/bloodBank">
                        {/* Blood Bank Card */}
                        <div className="card p-5 login-card" style={{ width: '18rem' }}>
                            <img src={BloodBank} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Blood Bank Login</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginType