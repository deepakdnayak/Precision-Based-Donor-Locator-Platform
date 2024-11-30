import React, { useEffect, useState } from 'react'
import { useDonor } from "../context/DonorContext";

const DonorProfile = () => {

    const { donorDetails, updateDonorProfile } = useDonor();
    const [editedProfile, setEditedProfile] = useState(donorDetails);
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' }); // New state for coordinates
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        setEditedProfile(donorDetails); // Sync local state with donorDetails when they change
        if (donorDetails.D_LocationName) setLocationName(donorDetails.D_LocationName);
    }, [donorDetails]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    const handleSave = () => {
        // Save the updated profile, coordinates, and location name
        const updatedProfile = {
            ...editedProfile,
            coordinates,
            D_LocationName: locationName,
        };
        updateDonorProfile(editedProfile._id, updatedProfile);
    };

    const recordnLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinates({ latitude, longitude }); // Update state with fetched coordinates
                },
                (error) => {
                    console.error("Error fetching location:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    const fetchLocationName = async (latitude, longitude) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          if (data && data.display_name) {
            return data.display_name;
          }
          return "Unknown Location";
        } catch (error) {
          console.error("Error fetching location name:", error);
          return "Unknown Location";
        }
      };
    
      const recordLocation = async () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setCoordinates({ latitude, longitude });
              const location = await fetchLocationName(latitude, longitude);
              setLocationName(location);
            },
            (error) => {
              console.error("Error fetching location:", error);
            }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
        }
      };

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

    function formatBloodGroup(bloodGroup) {
        if (bloodGroup === "Aplus") return "A+";
        if (bloodGroup === "Aminus") return "A-";
        if (bloodGroup === "Bplus") return "B+";
        if (bloodGroup === "Bminus") return "B-";
        if (bloodGroup === "Oplus") return "O+";
        if (bloodGroup === "Ominus") return "O-";
        if (bloodGroup === "ABplus") return "AB+";
        if (bloodGroup === "ABminus") return "AB-";

        return bloodGroup;
    }

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
                                                <label htmlFor="B_State" className="form-label">State:</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Select State"
                                                    id="D_State"
                                                    name="D_State"
                                                    onChange={onChange}
                                                    value={editedProfile.D_State || ''}
                                                >
                                                    <option value="" disabled>Select a State</option>
                                                    {states.map(state => (
                                                        <option key={state.id} value={state.name}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="location" className="form-label">Location : </label>
                                            <input
                                                type="text"
                                                className="form-control me-2"
                                                id="location"
                                                name="location"
                                                readOnly
                                                value={`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`}
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
                                                <label htmlFor="B_State" className="form-label">Gender :</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Select Gender"
                                                    id="D_Gender"
                                                    name="D_Gender"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Gender || ''}
                                                > 
                                                <option value="" disabled>Select Gender </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="B_State" className="form-label">Blood Group :</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Select Gender"
                                                    id="D_BloodGroup"
                                                    name="D_BloodGroup"
                                                    onChange={onChange}
                                                    value={editedProfile.D_BloodGroup || ''}
                                                > 
                                                <option value="" disabled>Select Blood Group </option>
                                                <option value="Aplus">A+</option>
                                                <option value="Aminus">A-</option>
                                                <option value="Bplus">B+</option>
                                                <option value="Bminus">B-</option>
                                                <option value="Oplus">O+</option>
                                                <option value="Ominus">O-</option>
                                                <option value="ABplus">AB+</option>
                                                <option value="ABminus">AB-</option>
                                                </select>
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

                                            {/* Record Location */}
                                            <div className="mb-3">
                                                <label htmlFor="location" className="form-label">Location Coordinates:</label>
                                                <div className="d-flex align-items-center">

                                                <button type="button" className="btn btn-primary" onClick={recordLocation}>Record Location</button>
                                                </div>
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
                                    
                                    src={donorDetails.D_Gender=="Male"?'https://bootdey.com/img/Content/avatar/avatar7.png':'https://static.vecteezy.com/system/resources/previews/004/899/680/non_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg'}
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
                                    <div className="col"><strong>Blood Group: </strong><span>{formatBloodGroup(donorDetails.D_BloodGroup)}</span></div>
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
                                <li className="list-group-item py-3">
                                    <strong>Contact : </strong><span>{donorDetails.D_LocationName || "Not Recorded"}</span>
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

export default DonorProfile;
