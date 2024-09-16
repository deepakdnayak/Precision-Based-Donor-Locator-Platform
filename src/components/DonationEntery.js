import React from 'react'
import DonationTodayItem from './DonationTodayItem'

const DonationEntery = () => {
    return (
        <div className="container" style={{ marginTop: "80px" }}>

            <div className="row text-center">
                <h1>Donation Entry</h1>
            </div>

            <form className="row g-3 mt-3">

                <div className="col-md-4">
                    <label htmlFor="inputEmail4" className="form-label">Select Donor</label>
                    <select className="form-select" aria-label="Default select example">
                        <option>Select Donor</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
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
                    <button type="submit" class="btn btn-danger">Submit</button>
                </div>

            </form>
            <div className="row">
                <p className="fs-2 mt-4">Donations Today</p>
                <div className="col-md-2 my-2">
                    <DonationTodayItem />
                </div>


            </div>

        </div>
    )
}

export default DonationEntery