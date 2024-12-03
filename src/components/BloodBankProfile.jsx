import React, { useEffect, useState } from 'react'
import { useBloodBank } from "../context/BloodBankContext";
import { Link } from 'react-router-dom';

const BloodBankProfile = () => {

    const { bloodBankDetails, updateBloodBankProfile } = useBloodBank();
    const [editedProfile, setEditedProfile] = useState(bloodBankDetails);

    useEffect(() => {
        setEditedProfile(bloodBankDetails);
    }, [bloodBankDetails])

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle checkbox separately
        if (type === "checkbox") {
            setEditedProfile({ ...editedProfile, [name]: checked });
        } else {
            setEditedProfile({ ...editedProfile, [name]: value });
        }
    }

    const handlesave = () => {
        updateBloodBankProfile(editedProfile._id, editedProfile);
    }

    const states = [
        { id: 1, name: "Andhra Pradesh" },
        { id: 2, name: "Arunachal Pradesh" },
        { id: 3, name: "Assam" },
        { id: 4, name: "Bihar" },
        { id: 5, name: "Chhattisgarh" },
        { id: 6, name: "Goa" },
        { id: 7, name: "Gujarat" },
        { id: 8, name: "Haryana" },
        { id: 9, name: "Himachal Pradesh" },
        { id: 10, name: "Jharkhand" },
        { id: 11, name: "Karnataka" },
        { id: 12, name: "Kerala" },
        { id: 13, name: "Madhya Pradesh" },
        { id: 14, name: "Maharashtra" },
        { id: 15, name: "Manipur" },
        { id: 16, name: "Meghalaya" },
        { id: 17, name: "Mizoram" },
        { id: 18, name: "Nagaland" },
        { id: 19, name: "Odisha" },
        { id: 20, name: "Punjab" },
        { id: 21, name: "Rajasthan" },
        { id: 22, name: "Sikkim" },
        { id: 23, name: "Tamil Nadu" },
        { id: 24, name: "Telangana" },
        { id: 25, name: "Tripura" },
        { id: 26, name: "Uttar Pradesh" },
        { id: 27, name: "Uttarakhand" },
        { id: 28, name: "West Bengal" }
      ];

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
                                                <label htmlFor="B_Name" className="form-label">Name : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.B_Name==="default" || editedProfile.B_Name==="" ?"is-invalid":"is-valid"}`}
                                                    id="B_Name"
                                                    name="B_Name"
                                                    onChange={onChange}
                                                    value={editedProfile.B_Name==="default"?"":(editedProfile.B_Name || '')}
                                                    aria-describedby="emailHelp"
                                                />
                                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                   Enter Name
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">

                                            <div className="mb-3">
                                                <label htmlFor="B_LiscenceNo" className="form-label">Licence Number : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.B_LiscenceNo===0 || editedProfile.B_LiscenceNo==="" ?"is-invalid":"is-valid"}`}
                                                    id="B_LiscenceNo"
                                                    name="B_LiscenceNo"
                                                    onChange={onChange}
                                                    value={editedProfile.B_LiscenceNo===0?"":(editedProfile.B_LiscenceNo || '')}
                                                    aria-describedby="emailHelp"
                                                />
                                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                   Enter Licence Number
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className="mb-3">
                                                <label htmlFor="B_Address" className="form-label">Address : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.B_Address==="default" || editedProfile.B_Address==="" ?"is-invalid":"is-valid"}`}
                                                    id="B_Address"
                                                    name="B_Address"
                                                    onChange={onChange}
                                                    value={editedProfile.B_Address==="default"?"":(editedProfile.B_Address || '')}
                                                    aria-describedby="emailHelp"
                                                />
                                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                   Enter Address
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="mb-3">
                                                <label htmlFor="B_City" className="form-label">City : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.B_City==="default" || editedProfile.B_City==="" ?"is-invalid":"is-valid"}`}
                                                    id="B_City"
                                                    name="B_City"
                                                    onChange={onChange}
                                                    value={editedProfile.B_City==="default"?"":(editedProfile.B_City || '')}
                                                    aria-describedby="emailHelp"
                                                />
                                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                   Enter City
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className="mb-3">
                                                    <label htmlFor="B_State" className="form-label">State:</label>
                                                    <select
                                                        className={`form-select ${editedProfile.B_State==="default"?"is-invalid":"is-valid"}`}
                                                        aria-label="Select State"
                                                        id="B_State"
                                                        name="B_State"
                                                        onChange={onChange}
                                                        value={editedProfile.B_State==="default"?"":(editedProfile.B_State || '')}
                                                    >
                                                        <option value="" disabled>Select a State</option>
                                                        {states.map(state => (
                                                            <option key={state.id} value={state.name}>
                                                                {state.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                        Select State
                                                    </div>
                                                </div>
                                            </div>

                                        <div className="col-12 col-lg-6">
                                            <div className="mb-3">
                                                <label htmlFor="B_Contact" className="form-label">Contact : </label>
                                                <input
                                                    type="tel"
                                                    className={`form-control ${editedProfile.B_Contact===0 || editedProfile.B_Contact==="" ?"is-invalid":"is-valid"}`}
                                                    id="B_Contact"
                                                    name="B_Contact"
                                                    onChange={onChange}
                                                    value={editedProfile.B_Contact===0?"":(editedProfile.B_Contact   || '')}
                                                    aria-describedby="emailHelp"
                                                />
                                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                   Enter Contact No.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label htmlFor="B_InventoryAPI" className="form-label">API : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.B_InventoryAPI==="default" || editedProfile.B_InventoryAPI==="" ?"is-invalid":"is-valid"}`}
                                                    id="B_InventoryAPI"
                                                    name="B_InventoryAPI"
                                                    onChange={onChange}
                                                    value={editedProfile.B_InventoryAPI==="default"?"":(editedProfile.B_InventoryAPI || '')}
                                                    aria-describedby="emailHelp"
                                                />
                                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                                   Enter Connetction API
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="B_IsGov"
                                                    name="B_IsGov"
                                                    onChange={onChange}
                                                    checked={editedProfile.B_IsGov || false}
                                                />
                                                <label className="form-check-label" htmlFor="B_IsGov">Government Managed</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-lg-6">

                                        </div>
                                        <div className="col-12 col-lg-6">

                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={handlesave} data-bs-dismiss="modal">Save</button>
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
                                    src="https://static.vecteezy.com/system/resources/thumbnails/017/177/954/small/round-medical-cross-symbol-on-transparent-background-free-png.png"
                                    alt="User Avatar"
                                    className="img-fluid rounded-circle mb-3 mt-4"
                                />
                                <h5 className="card-title mt-3">{bloodBankDetails.B_Name}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-items-stretch">
                        <div className="card w-100">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-3">
                                    <strong>Licence No. : </strong><span>{bloodBankDetails.B_LiscenceNo}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Email : </strong><span>{bloodBankDetails.B_Email}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Address : </strong><span>{bloodBankDetails.B_Address}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>City : </strong><span>{bloodBankDetails.B_City}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>State : </strong><span>{bloodBankDetails.B_State}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>IdGov : </strong><span>{bloodBankDetails.B_IsGov ? "Government" : "Private"}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Contact : </strong><span>{bloodBankDetails.B_Contact}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>API : </strong><span>{bloodBankDetails.B_InventoryAPI}</span>
                                </li>
                            </ul>
                            <div className="card-body py-4">
                                <div className="row">
                                    <div className="col-lg-4 col-md-12 mb-2 px-0 px-md-4">
                                        <Link to="/bloodBankInventory" className="btn btn-danger w-100">Check Inventory</Link>
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