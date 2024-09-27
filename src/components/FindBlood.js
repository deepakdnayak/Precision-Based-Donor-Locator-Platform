import React, { useContext, useEffect, useState } from 'react';
import FindBloodDonorItem from './FindBloodItem';
import BloodBankContext from '../context/BloodBank/BloodBankContext';

/**
 * This component allows users to search for blood donors based on blood group.
 * It fetches matching donors from the BloodBankContext and displays them.
 *
 * @returns {JSX.Element} The rendered component.
 */
const FindBlood = () => {
  const { searchMatchDonor } = useContext(BloodBankContext); // Access search function from context
  const [matchingDonors, setMatchingDonors] = useState([]); // Stores list of matching donors

  /**
   * Handles the search button click.
   * Fetches matching donors based on the selected blood group.
   */
  const handleSearch = async () => {
    const bloodGroup = document.getElementById('userSelection').value;
    const matchD = await searchMatchDonor(bloodGroup);
    console.log('Matched donors:', matchD); // Log for debugging
    setMatchingDonors(matchD); // Update state with matching donors
  };

  /**
   * Runs after the `matchingDonors` state changes.
   * Logs the updated list of matching donors for debugging.
   */
  useEffect(() => {
    console.log('Matching donors:', matchingDonors);
  }, [matchingDonors]); // Dependency array: Re-run only when matchingDonors changes

  return (
    <div className="container" style={{ marginTop: "80px" }}>

      <div className="row text-center">
        <h1>Search for Blood</h1>
      </div>

      <form className="row g-3 mt-3">

        <div className="col-md">
          <label htmlFor="inputEmail4" className="form-label"> Blood Group </label>
          <select className="form-select" aria-label="Default select example" id="userSelection">
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

        <div className="col-md-12 d-flex justify-content-end">
          <button onClick={handleSearch} type="button" className="btn btn-danger">Search</button>
        </div>

      </form>

      <div className="row">
        <h4>Available Blood Banks : </h4>
      </div>
      <div className="row"> {/* Assuming FindBloodDonorItem displays blood bank details */}
        <div className="col-md-3 my-2">
          <FindBloodDonorItem />
        </div>
        <div className="col-md-3 my-2">
          <FindBloodDonorItem />
        </div>
        <div className="col-md-3 my-2">
          <FindBloodDonorItem />
        </div>
        <div className="col-md-3 my-2">
          <FindBloodDonorItem />
        </div>
      </div>

      <div className="row mt-5">
        <h4>Donors with Blood Group Match : </h4>
      </div>
      <div className="row">
        {matchingDonors.map((donor) => (
          <div className="col-md-3 my-2" key={donor._id}>
            <FindBloodDonorItem
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