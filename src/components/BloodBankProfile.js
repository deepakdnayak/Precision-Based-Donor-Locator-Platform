import React from 'react'

const BloodBankProfile = () => {
    return (
        <div>
            <div className="container" style={{ marginTop: "80px" }}>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Information</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    <div className="row">
                                        <div className="col-12 col-lg-6">

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Name : </label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Address : </label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">State : </label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                            <div className="mb-3 form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Government Managed</label>
                                            </div>

                                        </div>
                                        <div className="col-12 col-lg-6">

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Licence Number : </label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">City : </label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Contact : </label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>

                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row text-center">
                    <h1>Blood Bank Profile</h1>
                </div>
                <div className="row mt-3 px-3 px-md-0">
                    <div className="col-md-4 d-flex align-items-stretch mb-3 mb-md-0">
                        <div className="card w-100">
                            <div className="card-body text-center">
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt="User Avatar"
                                    className="img-fluid rounded-circle mb-3 mt-4"
                                />
                                <h5 className="card-title mt-3">BBName</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-items-stretch">
                        <div className="card w-100">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-3">
                                    <strong>Licence No. : </strong><span>BLcNo</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Email : </strong><span>BBEmail</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Address : </strong><span>BBAddress</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>City : </strong><span>BBcity</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>State : </strong><span>BBState</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>IdGov : </strong><span>BBIdGov</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Contact : </strong><span>BBPhone</span>
                                </li>
                            </ul>
                            <div className="card-body py-4">
                            <div className="row">
                                    <div className="col-lg-4 col-md-12 mb-2 px-0 px-md-4">
                                        <button className="btn btn-danger w-100">Check Inventory</button>
                                    </div>
                                    <div className="col-lg-4 col-md-12 mb-2 px-0 px-md-4">
                                        <button className="btn btn-danger w-100">Record Donations</button>
                                    </div>
                                    <div className="col-lg-4 col-md-12 mb-2 px-0 px-md-4">
                                        <button type="button" className="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloodBankProfile