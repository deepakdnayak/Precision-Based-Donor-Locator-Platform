import React from 'react'

const FindBloodDonorItem = (props) => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.fname} {props.lname}</h5>
                    <div className="card-text my-1">{props.contact}</div>
                    <div className="card-text my-1">{props.address}</div>
                    <div className="card-text my-1">{props.city}</div>
                    <div className="card-text my-1">{props.state}</div>
                    <a href={`tel:${props.contact}`} className="btn btn-danger my-1">Contact</a>
                </div>
            </div>
        </div>
    )
}

export default FindBloodDonorItem