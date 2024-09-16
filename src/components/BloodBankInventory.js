import React from 'react'

const BloodBankInventory = () => {
    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <h2>Blood Inventory</h2>
            <div className="table-responsive">
                <table className="table mt-3">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Blood Type</th>
                            <th scope="col">Blood Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BloodBankInventory