import { useState } from 'react';
import BloodBankContext from './BloodBankContext'

const BloodBankState = props => {
    const host = "http://localhost:5000";
    const [bloodBankAuthToken, setBloodBankAuthToken] = useState(null);

    const registerBloodBank = async (credential)=> {
        try {
            const responce = await fetch(`${host}api/authBloodBank/createBloodBank`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credential),
            });    

            const json = await responce.json();
            if(json.success) {
                setBloodBankAuthToken(json.authToken);
                return {success: true}

            }
            else {
                return { succes: false}
            }
        } 
        catch (error) {
            console.error("Error during registration:", error);
            return { success: false };
        }
    }




    return(
        <BloodBankContext.Provider value={{ bloodBankAuthToken, registerBloodBank }}>
            {props.children}
        </BloodBankContext.Provider>
    )
}

export default BloodBankState;