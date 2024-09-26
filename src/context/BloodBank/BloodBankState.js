import { useCallback, useEffect, useState } from 'react';
import BloodBankContext from './BloodBankContext'

const BloodBankState = props => {
    const host = "http://localhost:5000";
    const [bloodBankAuthToken, setBloodBankAuthToken] = useState(null);
    const [bloodBankDetails, setBloodBankDetails] = useState({
        B_Email: "",
        B_LiscenceNo: "",
        B_Name: "",
        B_Address: "",
        B_City: "",
        B_State: "",
        B_IsGov: false,
        B_Contact: 0,
    });

    useEffect(() => {
        console.log("Blood Bank AuthToken in State = " + bloodBankAuthToken);
    }, [bloodBankAuthToken]);

    const registerBloodBank = async (credential)=> {
        try {
            const responce = await fetch(`${host}/api/authBloodBank/createBloodBank`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credential),
            });    

            const json = await responce.json();
            console.log("*****");
            console.log(json.authToken);
            
            if(json.success) {
                setBloodBankAuthToken(json.authToken);
                console.log("### AT = "+bloodBankAuthToken);
                return {success: true};
            }
            else {
                return { success: false, message: json.message };
            }
        } 
        catch (error) {
            console.error("Error during registration:", error);
            return { success: false };
        }
    }

    const loginBloodBank = async (credential) => {
        try {
            const responce = await fetch(`${host}/api/authBloodBank/login`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credential),
            });

            const json = await responce.json();

            if(json.success) {
                setBloodBankAuthToken(json.authToken);
                console.log("### AT = "+bloodBankAuthToken);
                return { success: true };
            }
            else {
                return {success: false, message: json.message };
            }
        } 
        catch (error) {
            console.error("Error during login:", error);
            return { success: false };
        }
    }

    const getBloodBankProfileDetails = useCallback(async () => {
        if (!bloodBankAuthToken) {
            console.error("No auth token found, cannot fetch bloodBank details");
            return;
        }

        try {
            const responce = await fetch(`${host}/api/authBloodBank/getBloodBank`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authToken": bloodBankAuthToken
                },
            });
            const profile = await responce.json();
            setBloodBankDetails(profile);    
        } 
        catch (error) {
            console.error("Failed to fetch donor details", error);
        }
    }, [bloodBankAuthToken])

    useEffect(()=> {
        if (bloodBankAuthToken) {
            getBloodBankProfileDetails();
        }
    }, [bloodBankAuthToken, getBloodBankProfileDetails]);

    
    const updateBloodBankProfile = async (id,credentials)=> {
        try {
            const responce = await fetch(`${host}/api/authBloodBank/updateBloodBank/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authToken": bloodBankAuthToken
                },
                body: JSON.stringify(credentials),
            });
            const result = await responce.json();
            if(result.success){
                setBloodBankDetails(credentials);
                console.log(bloodBankDetails);
                console.log("Blood Bank Profile updated successfully");
            }   
            else {
                console.log("Failed to update Blood bank Profile",result.message);
            }
        } 
        catch (error) {
            console.error("Failed to update Blood bank details",error);
        }
    }

    const searchMatchDonor = async (bloodGroup)=> {
        try {
            const responce = await fetch(`${host}/api/donation/searchDonorMatch`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ D_BloodGroup: bloodGroup }),
            });
            const result = await responce.json();
            console.log("Donor Matches found.");
            return result.donors;
        } 
        catch (error) {
            console.error("Failed to fetch matching donor details",error);
        }
    }




    return(
        <BloodBankContext.Provider value={{ bloodBankAuthToken, registerBloodBank, loginBloodBank, bloodBankDetails, updateBloodBankProfile, searchMatchDonor }}>
            {props.children}
        </BloodBankContext.Provider>
    )
}

export default BloodBankState;