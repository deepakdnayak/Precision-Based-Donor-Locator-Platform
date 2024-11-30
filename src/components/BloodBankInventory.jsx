import React, { useEffect } from 'react'
import { useBloodBank } from "../context/BloodBankContext";
import { Toaster, toast } from 'sonner'

const BloodBankInventory = () => {

    const { bloodBankInventory } = useBloodBank();
    //const navigate = useNavigate();

    useEffect(()=>{
        if(bloodBankInventory===null){
            toast.error("Please login");
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
                            <th scope="row">3</th>
                            <td>B +ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Bplus:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>B -ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Bmin:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>O +ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Oplus:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>O -ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.Omin:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">7</th>
                            <td>AB +ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.ABplus:"Please Login"} [ L ]</td>
                        </tr>
                        <tr>
                            <th scope="row">8</th>
                            <td>AB -ve</td>
                            <td>{bloodBankInventory?bloodBankInventory.ABmin:"Please Login"} [ L ]</td>
                        </tr>
                        
                        
                    </tbody>
                </table>
            </div>
            <Toaster position="top-center" expand={false} richColors   />
        </div>
    )
}

export default BloodBankInventory;