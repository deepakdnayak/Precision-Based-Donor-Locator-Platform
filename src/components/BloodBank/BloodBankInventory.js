import React, { useContext, useEffect } from 'react'
import BloodBankContext from '../../context/BloodBank/BloodBankContext'

const BloodBankInventory = () => {

    const { bloodBankInventory } = useContext(BloodBankContext);
    //const navigate = useNavigate();

    useEffect(()=>{
        if(bloodBankInventory===null){
            console.log("Please login");
        }
    },[bloodBankInventory])

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
                            <td>A +ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Aplus:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>A -ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Amin:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>B +ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Bplus:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>B -ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Bmin:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>O +ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Oplus:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>O -ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Omin:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>AB +ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.ABplus:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>AB -ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.ABmin:"Please Login"} [ L ]</td>
                        </tr>
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BloodBankInventory;