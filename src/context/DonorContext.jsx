import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import Cookies from "js-cookie";

// Create the context
const DonorContext = createContext();

// Provider component
export const DonorProvider = ({ children }) => {
  const host = "http://localhost:5000";
  const [donorAuthToken, setDonorAuthToken] = useState(
    localStorage.getItem("setdonorAuthToken") ||
      Cookies.get("setdonorAuthToken") ||
      null
  );
  const [donorDetails, setDonorDetails] = useState({
    _id: null,
    D_Fname: "",
    D_Lname: "",
    D_Age: 0,
    D_Gender: "",
    D_BloodGroup: "",
    D_LastDonationDate: "",
    D_Email: "",
    D_AdharNo: "",
    D_Address: "",
    D_City: "",
    D_State: "",
    D_Contact: "",
    location: { coordinates: [null, null] }
  });

  useEffect(() => {
    // Check localStorage for existing tokens
    const donorAuthToken =
      localStorage.getItem("donorAuthToken") || Cookies.get("donorAuthToken");

    if (donorAuthToken) setDonorAuthToken(donorAuthToken);
  }, []);

  const saveAuthToken = (token) => {
    localStorage.setItem("donorAuthToken", token); // Store in localStorage
    Cookies.set("donorAuthToken", token, { expires: 7 }); // Store in cookies with a 7-day expiry
    setDonorAuthToken(token);
  };

  const registerDonor = async (credential) => {
    try {
      const responce = await fetch(`${host}/api/authDonor/createDonor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });

      const json = await responce.json();

      if (json.success) {
        return { success: true };
      } else {
        return { success: false, message: json.message };
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      return { success: false };
    }
  };

  const loginDonor = async (credential) => {
    try {
      const responce = await fetch(`${host}/api/authDonor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credential),
      });

      const json = await responce.json();

      if (json.success) {
        saveAuthToken(json.authToken);
        return { success: true };
      } else {
        return { success: false, message: json.message };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false };
    }
  };

  const getDonorProfileDetails = useCallback(async () => {
    const token = donorAuthToken || localStorage.getItem('donorAuthToken') || Cookies.get("donorAuthToken");
    if (!token) {
      //console.error("No auth token found, cannot fetch donor details");
      return;
    }

    try {
      const responce = await fetch(`${host}/api/authDonor/getDonor`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          "authToken": token,
        },
      });
      const profile = await responce.json();
      setDonorDetails(profile);
    } catch (error) {
      console.error("Failed to fetch donor details", error);
    }
  }, [donorAuthToken]);

  useEffect(() => {
      getDonorProfileDetails();
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
        }
        else {
            console.error("Failed to update donor profile",result.message);
        }  
    } 
    catch (error) {
        console.error("Failed to update donor details", error);
    }
}

  const logoutD = () => {
    setDonorAuthToken(null);
    localStorage.removeItem("donorAuthToken");
    Cookies.remove("donorAuthToken");
  };

  // ///////

  return (
    <DonorContext.Provider
      value={{
        donorAuthToken,
        setDonorAuthToken,
        registerDonor,
        loginDonor,
        donorDetails,
        updateDonorProfile,
        logoutD
      }}
    >
      {children}
    </DonorContext.Provider>
  );
};

// Custom hook for consuming the context
export const useDonor = () => {
  const context = useContext(DonorContext);
  if (!context) {
    throw new Error("useDonor must be used within a DonorProvider");
  }
  return context;
};
