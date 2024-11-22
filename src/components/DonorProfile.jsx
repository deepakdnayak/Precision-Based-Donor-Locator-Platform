import React, { useEffect, useState } from 'react'
import { useDonor } from "../context/DonorContext";

const DonorProfile = () => {

    const { donorDetails, updateDonorProfile } = useDonor();
    const [editedProfile, setEditedProfile] = useState(donorDetails); 

    useEffect(() => {
        setEditedProfile(donorDetails); // Sync local state with donorDetails when they change
    }, [donorDetails]);

    const onChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        updateDonorProfile(editedProfile._id, editedProfile); 
    };

    return (
        <div>
            <div className="container" style={{ marginTop: "80px" }}>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Information</h1>
                                <button
                                    type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    <div className="row">
                                        <div className="col-12 col-lg-6">

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">First Name : </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="D_Fname"
                                                    name="D_Fname"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Fname || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Age : </label>
                                                <input
                                                    type="numbe"
                                                    className="form-control"
                                                    id="D_Age"
                                                    name="D_Age"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Age || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Adhar Number : </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="D_AdharNo"
                                                    name="D_AdharNo"
                                                    onChange={onChange}
                                                    value={editedProfile.D_AdharNo || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Address : </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="D_Address"
                                                    name="D_Address"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Address || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">State : </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="D_State"
                                                    name="D_State"
                                                    onChange={onChange}
                                                    value={editedProfile.D_State || ''}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-12 col-lg-6">

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Last Name : </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="D_Lname"
                                                    name="D_Lname"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Lname || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Gender : </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="D_Gender"
                                                    name="D_Gender"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Gender || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Blood Group : </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="D_BloodGroup"
                                                    name="D_BloodGroup"
                                                    onChange={onChange}
                                                    value={editedProfile.D_BloodGroup || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">City : </label>
                                                <input
                                                    type="text "
                                                    className="form-control"
                                                    id="D_City"
                                                    name="D_City"
                                                    onChange={onChange}
                                                    value={editedProfile.D_City || ''}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Contact : </label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="D_Contact"
                                                    name="D_Contact"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Contact || ''}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button
                                    type="button" className="btn btn-danger" onClick={handleSave} data-bs-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row text-center">
                    <h1>Donor Profile</h1>
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
                                <h5 className="card-title mt-3"><span> {donorDetails.D_Fname} </span><span> {donorDetails.D_Lname} </span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-items-stretch">
                        <div className="card w-100">
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item py-3">
                                    <div className="row">
                                        <div className="col"><strong>Age : </strong><span>{donorDetails.D_Age}</span></div>
                                        <div className="col"><strong>Gender : </strong><span>{donorDetails.D_Gender}</span></div>
                                    </div>
                                </li>
                                <li className="list-group-item py-3">
                                    <div className="row">
                                        <div className="col"><strong>Blood Group : </strong><span>{donorDetails.D_BloodGroup}</span></div>
                                        <div className="col"><strong>Last Donation Date : </strong><span>{donorDetails.D_LastDonationDate}</span></div>
                                    </div>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Email : </strong><span>{donorDetails.D_Email}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Adhar Number : </strong><span>{donorDetails.D_AdharNo}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Address : </strong><span> {`${donorDetails.D_Address}, ${donorDetails.D_City}, ${donorDetails.D_State}`}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Contact : </strong><span>{donorDetails.D_Contact}</span>
                                </li>
                            </ul>
                            <div className="card-body py-4">
                                <div className="row">
                                    <div className="col-lg-4 col-md-12 mb-2 px-0 px-md-4">
                                        <button
                                            type="button" className="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
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

export default DonorProfile