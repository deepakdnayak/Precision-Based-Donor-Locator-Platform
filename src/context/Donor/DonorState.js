import { useCallback, useEffect, useState } from "react";
import DonorContext from './DonorContext'

const DonorState = props => {
    const host = "http://localhost:5000";

    const [donorAuthToken, setDonorAuthToken] = useState(null)
    const [donorDetails, setDonorDetails] = useState({
        D_Fname: '',
        D_Lname: '',
        D_Age: 0,
        D_Gender: '',
        D_BloodGroup: '',
        D_LastDonationDate: '',
        D_Email: '',
        D_AdharNo: '',
        D_Address: '',
        D_City: '',
        D_State: '',
        D_Contact: '',
    });

    // useEffect(() => {
    //     console.log("Donor Auth Token in State: " + donorAuthToken);
    // }, [donorAuthToken]);


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

    const loginDonor = async (credential)=> {
        try {
            const responce = await fetch(`${host}/api/authDonor/login`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credential),
            });

            const json = await responce.json();

            if(json.success) {
                setDonorAuthToken(json.authToken);
                console.log("### AT = "+donorAuthToken);
                return { success: true };
            }
            else {
                return { success: false, message: json.message };
            }
        } 
        catch (error) {
            console.error("Error during login:", error);
            return { success: false };
        }
    }

    const getDonorProfileDetails = useCallback(async () => {

        if (!donorAuthToken) {
            console.error("No auth token found, cannot fetch donor details");
            return;
        }

        try {
            const responce = await fetch(`${host}/api/authDonor/getDonor`,{
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json",
                    "authToken": donorAuthToken
                },
            });
            const profile = await responce.json();
            setDonorDetails(profile);
        } 
        catch (error) {
            console.error("Failed to fetch donor details", error);
        }
    }, [donorAuthToken])

    useEffect(() => {
        if (donorAuthToken) {
            getDonorProfileDetails();
        }
    }, [donorAuthToken, getDonorProfileDetails]);

    const updateDonorProfile = async (id,credentials) =>{
        try {
            const responce = await fetch(`${host}/api/authDonor/updateDonor/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "Application/json",
                    "authToken": donorAuthToken
                },
                body: JSON.stringify(credentials),
            });
            const result = await responce.json(); 
            if(result.success){
                setDonorDetails(credentials);
                console.log(donorDetails);
                console.log("Donor profile updated successfully");
            }
            else {
                console.log("Failed to update donor profile",result.message);
            }  
        } 
        catch (error) {
            console.error("Failed to update donor details", error);
        }
    }
    

    return(
        <DonorContext.Provider value={{ donorAuthToken, setDonorAuthToken, registerDonor, loginDonor, donorDetails, updateDonorProfile }}>
            {props.children}
        </DonorContext.Provider>
    )
}

export default DonorState;