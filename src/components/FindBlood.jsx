import React, { useContext, useEffect, useState } from 'react';
import FindBloodItem from './FindBloodItem';
import { useBloodBank } from "../context/BloodBankContext";

const FindBlood = () => {
  const { searchMatchDonor, searchBloodBanks } = useBloodBank();
  const [matchingDonors, setMatchingDonors] = useState([]); 
  const [matchingBloodBank, setMatchingBloodBank] = useState([])


  const handleSearch = async () => {
    const bloodGroup = document.getElementById('userSelection').value;
    const bloodQuantity = document.getElementById('bloodQuantity').innerHTML;


    const matchD = await searchMatchDonor(bloodGroup);
    setMatchingDonors(matchD); 

    const matchBB = await searchBloodBanks(bloodGroup,1);
    setMatchingBloodBank(matchBB);
  };

  // useEffect(() => {
  //   console.log('Matching donors:', matchingDonors);
  // }, [matchingDonors]); 

  return (
    <div className="container" style={{ marginTop: "80px" }}>

      <div className="row text-center">
        <h1>Search for Blood</h1>
      </div>

      <form className="row g-3 mt-3">

        <div className="col-md-6">
          <label htmlFor="userSelection" className="form-label fs-4"> Blood Group </label>
          <select className="form-select" aria-label="Default select example" id="userSelection" required>
            <option>Select Blood Group</option>
            <option value="Aplus">A+</option>
            <option value="Amin">A-</option>
            <option value="Bplus">B+</option>
            <option value="Bmin">B-</option>
            <option value="Oplus">O+</option>
            <option value="Omin">O-</option>
            <option value="ABplus">AB+</option>
            <option value="ABmin">AB-</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="bloodQuantity" className="form-label fs-4"> Blood Quantity </label>
          <input type="number" className="form-control" placeholder="Quantity in ml" id="bloodQuantity" aria-label="Quantity in ml  " min="1"/>
        </div>

        <div className="col-md-12 d-flex justify-content-end">
          <button onClick={handleSearch} type="button" className="btn btn-danger fs-4">Search</button>
        </div>

      </form>

      <div className="row">
        <h4>{matchingBloodBank.length===0?"":"Available Blood Banks : "}</h4>
      </div>
      <div className="row"> 
        {matchingBloodBank.map((bloodBank)=> (
          <div className="col-md-3 my-2" key={bloodBank._id}>
            <FindBloodItem
              fname={bloodBank.B_Name}
              lname=""
              address={bloodBank.B_Address}
              city={bloodBank.B_City}
              state={bloodBank.B_State}
              contact={bloodBank.B_Contact}
            />
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <h4>{matchingDonors.length===0?"":"Donors with Blood Group Match : "}</h4>
      </div>
      <div className="row">
        {matchingDonors.map((donor) => (
          <div className="col-md-3 my-2" key={donor._id}>
            <FindBloodItem
              fname={donor.D_Fname}
              lname={donor.D_Lname}
              address={donor.D_Address}
              city={donor.D_City}
              state={donor.D_State}
              contact={donor.D_Contact}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default FindBlood;