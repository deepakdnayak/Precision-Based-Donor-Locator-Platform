import { useEffect, useState } from "react";
import DonorContext from './DonorContext'

const DonorState = props => {
    const host = "http://localhost:5000";
    const [donorAuthToken, setDonorAuthToken] = useState(null)

    useEffect(() => {
        console.log("D At in State = " + donorAuthToken);
    }, [donorAuthToken]);

    const registerDonor = async (credential)=> {
        try {
            const responce = await fetch(`${host}/api/authDonor/createDonor`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credential),
            });
            
            const json = await responce.json();

            console.log(json.authToken);

            if(json.success) {
                setDonorAuthToken(json.authToken);
                console.log("### AT = "+donorAuthToken);
                return { success: true }
            }
            else {
                return { success: false, message: json.message };
            }
        } 
        catch (error) {
            console.log("Error during registration: ", error);
            return { success: false };
        }
    }

    return(
        <DonorContext.Provider value={{ donorAuthToken, registerDonor }}>
            {props.children}
        </DonorContext.Provider>
    )
}

export default DonorState;