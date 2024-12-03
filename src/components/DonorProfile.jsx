import React, { useEffect, useRef, useState } from 'react'
import { useDonor } from "../context/DonorContext";
import User from '../images/user.png'
import Male from '../images/Male.png'
import Female from '../images/female.jpg'
import { Toaster, toast } from 'sonner'

const DonorProfile = () => {

    const buttonRef = useRef(null);

    const { donorDetails, updateDonorProfile } = useDonor();
    const [editedProfile, setEditedProfile] = useState({
        _id: null,
        D_Fname: "",
        D_Lname: "",
        D_Age: "",
        D_Gender: "",
        D_BloodGroup: "",
        D_Email: "",
        D_AdharNo: "",
        D_Address: "",
        D_City: "",
        D_State: "",
        D_Contact: "",
        ...donorDetails, // Overwrite with actual details if available
    });
    const [coordinates, setCoordinates] = useState({
        latitude: null,
        longitude: null
    }); // New state for coordinates
    const [location, setLocation] = useState(null); // New state for coordinates

    useEffect(() => {
        if (coordinates.latitude && coordinates.longitude) {
            (async () => {
                const locationName = await getLocationName(coordinates.latitude, coordinates.longitude);
                setLocation(locationName);
            })();
        }
    }, [coordinates]);  

    const checkProfileStatus = () => {
        if (!donorDetails) {
            console.warn("donorDetails is not yet available.");
            return 0; // Return 0 if donorDetails is not loaded
        }
        const totalFields = 10; // Total number of fields to check
        let incompleteFields = 0;
    
        if (donorDetails.D_Fname === "default") incompleteFields++;
        if (donorDetails.D_Lname === "default") incompleteFields++;
        if (donorDetails.D_AdharNo === 0) incompleteFields++;
        if (donorDetails.D_Age === 0) incompleteFields++;
        if (donorDetails.D_BloodGroup === "default") incompleteFields++;
        if (donorDetails.D_Address === "default") incompleteFields++;
        if (donorDetails.D_City === "default") incompleteFields++;
        if (donorDetails.D_State === "default") incompleteFields++;
        if (donorDetails.D_Contact === 0) incompleteFields++;
        if (donorDetails.D_Gender === "default") incompleteFields++;
    
        // Calculate the completion percentage
        return (incompleteFields / totalFields) * 100;
    };

    const simulateClick = () => {
        if (buttonRef.current) {
            buttonRef.current.click(); // Simulate the click
        }
    };

    useEffect(() => {
        setEditedProfile((prev) => ({
          ...prev,
          ...donorDetails, // Overwrite with the latest donorDetails
        }));

        if (checkProfileStatus() > 40) { // Show warning if profile completion is below 60%
            toast.warning("Please update your profile.");
            simulateClick();
        }

      }, [donorDetails]);      

    useEffect(() => {
        if (donorDetails?.location?.coordinates) {
            setCoordinates({
                latitude: donorDetails.location.coordinates[1] || null,
                longitude: donorDetails.location.coordinates[0] || null
            });
        } else {
            console.warn("Location or coordinates are missing in donorDetails.");
        }
    }, [donorDetails]);
    

    const onChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    const handleSave = () => {
        if (!editedProfile._id) {
            console.error("Cannot update profile: Missing ID.");
            return;
          }
        // Save the updated profile and coordinates
        const updatedProfile = { 
            ...editedProfile, 
            D_Latitude: coordinates.latitude, 
            D_Longitude: coordinates.longitude 
        };
        updateDonorProfile(editedProfile._id, updatedProfile);
    };
      
    const recordLocation = () => {        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (!position.coords.latitude || !position.coords.longitude) {
                        console.error("Invalid geolocation data received.");
                        return;
                    }
                    const { latitude, longitude } = position.coords;
                    setEditedProfile({ 
                        ...editedProfile, 
                        D_Latitude: latitude, 
                        D_Longitude: longitude 
                    });
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

    const getLocationName = async (lat, lon)=> {
        if (!lat || !lon) {
            throw new Error("Invalid coordinates provided.");
        }
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
    
            return data.display_name || "Unknown location";
        } catch (error) {
            console.error("Error retrieving location name:", error.message);
            return null;
        }
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
                                                <label htmlFor="D_Fname" className="form-label">First Name : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.D_Fname==="default" || editedProfile.D_Fname==="" ?"is-invalid":"is-valid"}`}
                                                    id="D_Fname"
                                                    name="D_Fname"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Fname==="default"?"":(editedProfile.D_Fname || '')}
                                                />
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Enter First Name
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_Age" className="form-label">Age : </label>
                                                <input
                                                    type="numbe"
                                                    className={`form-control ${editedProfile.D_Age===0 || editedProfile.D_Age==="" ?"is-invalid":"is-valid"}`}
                                                    id="D_Age"
                                                    name="D_Age"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Age===0?"":(editedProfile.D_Age || '')}
                                                />
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Enter Age
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_AdharNo" className="form-label">Adhar Number : </label>
                                                <input
                                                    type="number"
                                                    className={`form-control ${editedProfile.D_AdharNo===0 || editedProfile.D_AdharNo==="" ?"is-invalid":"is-valid"}`}
                                                    id="D_AdharNo"
                                                    name="D_AdharNo"
                                                    onChange={onChange}
                                                    value={editedProfile.D_AdharNo===0?"":(editedProfile.D_AdharNo || '')}
                                                />
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Enter Adhar Number
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_Address" className="form-label">Address : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.D_Address==="default" || editedProfile.D_Address==="" ?"is-invalid":"is-valid"}`}
                                                    id="D_Address"
                                                    name="D_Address"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Address==="default"?"":(editedProfile.D_Address || '')}
                                                />
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Enter Address
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_State" className="form-label">State:</label>
                                                <select
                                                    className={`form-select ${editedProfile.D_State==="default"?"is-invalid":"is-valid"}`}
                                                    aria-label="Select State"
                                                    id="D_State"
                                                    name="D_State"
                                                    onChange={onChange}
                                                    value={editedProfile.D_State==="default"?"":(editedProfile.D_State || '')}
                                                >
                                                    <option value="" disabled>Select a State</option>
                                                    {states.map(state => (
                                                        <option key={state.id} value={state.name}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            
                                        </div>
                                        <div className="col-12 col-lg-6">
                                        <div className="mb-3">
                                                <label htmlFor="D_Lname" className="form-label">Last Name : </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${editedProfile.D_Lname==="default" || editedProfile.D_Lname==="" ?"is-invalid":"is-valid"}`}
                                                    id="D_Lname"
                                                    name="D_Lname"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Lname==="default"?"":(editedProfile.D_Lname || '')}
                                                />
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Enter Last Name
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_Gender" className="form-label">Gender :</label>
                                                <select
                                                    className={`form-select ${editedProfile.D_Gender==="default"?"is-invalid":"is-valid"}`}
                                                    aria-label="Select Gender"
                                                    id="D_Gender"
                                                    name="D_Gender"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Gender==="default"?"":(editedProfile.D_Gender || '')}
                                                > 
                                                <option value="" disabled>Select Gender </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                </select>
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Select Gender
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_BloodGroup" className="form-label">Blood Group :</label>
                                                <select
                                                    className={`form-select ${editedProfile.D_BloodGroup==="default"?"is-invalid":"is-valid"}`}
                                                    aria-label="Select Gender"
                                                    id="D_BloodGroup"
                                                    name="D_BloodGroup"
                                                    onChange={onChange}
                                                    value={editedProfile.D_BloodGroup==="default"?"":(editedProfile.D_Gender || '')}
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
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Select Blood Group
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_City" className="form-label">City : </label>
                                                <input
                                                    type="text "
                                                    className={`form-control ${editedProfile.D_City==="default" || editedProfile.D_City==="" ?"is-invalid":"is-valid"}`}
                                                    id="D_City"
                                                    name="D_City"
                                                    onChange={onChange}
                                                    value={editedProfile.D_City==="default"?"":(editedProfile.D_City || '')}
                                                />
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Enter City
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="D_Contact" className="form-label">Contact : </label>
                                                <input
                                                    type="tel"
                                                    className={`form-control ${editedProfile.D_Contact===0 || editedProfile.D_Contact==="" ?"is-invalid":"is-valid"}`}
                                                    id="D_Contact"
                                                    name="D_Contact"
                                                    onChange={onChange}
                                                    value={editedProfile.D_Contact===0?"":(editedProfile.D_Contact || '')}
                                                />
                                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                                   Enter Contact
                                                </div>
                                            </div>
                                            
                                            

                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="location" className="form-label">Location Coordinates:</label>
                                            <div className="input-group mb-3">
                                                
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="location"
                                                    name="location"
                                                    readOnly
                                                    value={location || ""} 
                                                    aria-label="Recipient's username" 
                                                    aria-describedby="button-addon2"
                                                />
                                                <button className="btn btn-primary" type="button" id="button-addon2" onClick={recordLocation}>Record</button>
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
                                    
                                    src={donorDetails.D_Gender==="default"?User:(donorDetails.D_Gender=="Male"?Male:Female)}
                                    alt="User Avatar"
                                    className="img-fluid rounded-circle mb-3 mt-4"
                                />
                                <h5 className="card-title mt-3"><span> {donorDetails.D_Fname==="default"?"Please Update Profile":donorDetails.D_Fname} </span><span> {donorDetails.D_Lname==="default"?"":donorDetails.D_Lname} </span></h5>
                            
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-items-stretch">
                        <div className="card w-100">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-3">
                                    <strong>Email : </strong><span>{donorDetails.D_Email}</span>
                                </li>
                            <li className="list-group-item py-3">
                                    <div className="row">
                                        <div className="col"><strong>Age : </strong><span>{donorDetails.D_Age===0?"Please Update Profile":donorDetails.D_Age}</span></div>
                                        <div className="col"><strong>Gender : </strong><span>{donorDetails.D_Gender==="default"?"Please Update Profile":donorDetails.D_Gender}</span></div>
                                    </div>
                                </li>
                                <li className="list-group-item py-3">
                                    <div className="row">
                                        <div className="col"><strong>Blood Group: </strong><span>{donorDetails.D_BloodGroup==="default"?"Please Update Profile":formatBloodGroup(donorDetails.D_BloodGroup)}</span></div>
                                        {/* <div className="col"><strong>Last Donation Date : </strong><span>{donorDetails.D_LastDonationDate}</span></div> */}
                                    </div>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Adhar Number : </strong><span>{donorDetails.D_AdharNo===0?"Please Update Profile":donorDetails.D_AdharNo}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Address : </strong><span> {donorDetails.D_Address==="default" || donorDetails.D_City==="default" || donorDetails.D_State==="default"?"Please Update Profile":`${donorDetails.D_Address}, ${donorDetails.D_City}, ${donorDetails.D_State}`}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Contact : </strong><span>{donorDetails.D_Contact===0?"Please Update Profile":donorDetails.D_Contact}</span>
                                </li>
                                <li className="list-group-item py-3">
                                    <strong>Location : </strong><span>{location || "Not Saved Yet"}</span>
                                </li>
                            </ul>
                            <div className="card-body py-4">
                                <div className="row">
                                    <div className="col-lg-4 col-md-12 mb-2 px-0 px-md-4">
                                        <button
                                            type="button" className="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={buttonRef}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" expand={false} richColors   />
        </div>
    )
}

export default DonorProfile;
