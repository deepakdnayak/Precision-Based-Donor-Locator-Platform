import React from 'react'
import FindBloodDonorItem from './FindBloodItem'

const FindBlood = () => {
    return (
        <div className="container" style={{ marginTop: "80px" }}>

            <div className="row text-center">
                <h1>Search for Blood</h1>
            </div>

            <form className="row g-3 mt-3">

                <div className="col-md-4">
                    <label htmlFor="inputEmail4" className="form-label"> Blood Group </label>
                    <select className="form-select" aria-label="Default select example">
                        <option>Select Blood Group</option>
                        <option value="1">A+</option>
                        <option value="2">A-</option>
                        <option value="3">B+</option>
                        <option value="4">B-</option>
                        <option value="5">O+</option>
                        <option value="6">O-</option>
                        <option value="7">AB+</option>
                        <option value="8">AB-</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputEmail4" className="form-label">Blood Quantity</label>
                    <input type="number" className="form-control" id="inputEmail4" placeholder="Blood quantity in ml" />
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputEmail4" className="form-label">Blood Weight</label>
                    <input type="Number" className="form-control" id="inputEmail4" placeholder="Blood weight in grams" />
                </div>

                <div className="col-md-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-danger">Search</button>
                </div>

            </form>

            <div className="row">
                <h4>Available Blood Banks : </h4>
            </div>
            <div className="row">
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>


            </div>


            <div className="row mt-5">
                <h4>Donors with Blood Group Match : </h4>
            </div>
            <div className="row">
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>
                <div className="col-md-3 my-2">
                    <FindBloodDonorItem/>
                </div>
                


            </div>

        </div>
    )
}

export default FindBlood