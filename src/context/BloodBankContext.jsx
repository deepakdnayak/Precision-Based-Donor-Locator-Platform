import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import Cookies from "js-cookie";

// Create the context
const BloodBankContext = createContext();

// Provider component
export const BloodBankProvider = ({ children }) => {
  const host = "http://localhost:5000";
  const [bloodBankAuthToken, setBloodBankAuthToken] = useState(
    localStorage.getItem("bloodBankAuthToken") ||
      Cookies.get("bloodBankAuthToken") ||
      null
  );
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
  const [bloodBankApi, setBloodBankApi] = useState(null);
  const [bloodBankInventory, setBloodBankInventory] = useState(null);

  useEffect(() => {
    // Check localStorage for existing tokens
    const bloodBankToken =
      localStorage.getItem("bloodBankAuthToken") ||
      Cookies.get("bloodBankAuthToken");

    if (bloodBankToken) setBloodBankAuthToken(bloodBankToken);
  }, []);

  const saveAuthToken = (token) => {
    localStorage.setItem("bloodBankAuthToken", token); // Store in localStorage
    Cookies.set("bloodBankAuthToken", token, { expires: 7 }); // Store in cookies with a 7-day expiry
    setBloodBankAuthToken(token);
  };

  const registerBloodBank = async (credential) => {
    try {
      const response = await fetch(
        `${host}/api/authBloodBank/createBloodBank`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        }
      );

      const json = await response.json();

      if (json.success) {
        saveAuthToken(json.authToken);
        setTimeout(() => {
          getBloodBankProfileDetails();
        }, 5000);
        return { success: true };
      } else {
        return { success: false, message: json.message };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false };
    }
  };

  const loginBloodBank = async (credential) => {
    try {
      const response = await fetch(`${host}/api/authBloodBank/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });

      const json = await response.json();

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

  const getBloodBankProfileDetails = useCallback(async () => {
    const token =
      bloodBankAuthToken ||
      localStorage.getItem("bloodBankAuthToken") ||
      Cookies.get("bloodBankAuthToken");

    if (!token) {
      //console.error("No auth token found, cannot fetch bloodBank details");
      return;
    }

    try {
      const response = await fetch(`${host}/api/authBloodBank/getBloodBank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
      });
      const profile = await response.json();
      setBloodBankDetails(profile);
      setBloodBankApi(profile.B_InventoryAPI);
    } catch (error) {
      console.error("Failed to fetch bloodBank details", error);
    }
  }, [bloodBankAuthToken]);

  useEffect(() => {
    getBloodBankProfileDetails();
  }, [bloodBankAuthToken, getBloodBankProfileDetails]);

  const updateBloodBankProfile = async (id, credentials) => {
    try {
      const response = await fetch(
        `${host}/api/authBloodBank/updateBloodBank/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authToken: bloodBankAuthToken,
          },
          body: JSON.stringify(credentials),
        }
      );
      const result = await response.json();
      if (result.success) {
        setBloodBankDetails(credentials);
      } else {
        console.error("Failed to update Blood bank Profile:", result.message);
      }
    } catch (error) {
      console.error("Failed to update Blood bank details", error);
    }
  };

  const searchMatchDonor = async (bloodGroup) => {
    try {
      // Get user's current location
      const location = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (position.coords.latitude && position.coords.longitude) {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
              } else {
                reject("Invalid geolocation data received.");
              }
            },
            (error) => {
              reject("Error fetching location: " + error.message);
            }
          );
        } else {
          reject("Geolocation is not supported by your browser.");
        }
      });
  
      // Make API call with the new endpoint
      const response = await fetch(`${host}/api/searchBlood/findTheNearestDonors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bloodGroup,
          userLatitude: location.latitude,
          userLongitude: location.longitude,
        }),
      });
  
      const result = await response.json();
      return result.donors;
    } catch (error) {
      console.error("Failed to fetch matching donor details", error);
    }
  };
  

  const searchBloodBanks = async (bloodGroup, quantity) => {
    try {
        const response = await fetch(`${host}/api/searchBlood/searchBloodBanks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bloodGroup, quantity }),
        });

        const result = await response.json();

        if (result.success) {
            // Extract bloodBankDetails from the response
            return result.bloodBanks.map(bloodBank => bloodBank.bloodBankDetails);
        } else {
            console.error("No blood banks found:", result.message);
            return [];
        }
    } catch (error) {
        console.error("Failed to fetch blood bank details:", error);
        return [];
    }
};


  const getBloodBankInventory = useCallback(async () => {
    if (!bloodBankApi) {
      console.error("No API found, cannot fetch bloodBank details");
      return;
    }

    try {
      const response = await fetch(`${bloodBankApi}`);
      const inventory = await response.json();
      setBloodBankInventory(inventory);
    } catch (error) {
      console.error("Failed to fetch inventory from API", error);
    }
  }, [bloodBankApi]);

  useEffect(() => {
    if (bloodBankApi) {
      getBloodBankInventory();
    }
  }, [bloodBankApi, getBloodBankInventory]);

  const logoutBB = () => {
    setBloodBankAuthToken(null);
    //setDonorAuthToken(null);
    localStorage.removeItem("bloodBankAuthToken");
    //localStorage.removeItem("donorAuthToken");
    Cookies.remove("bloodBankAuthToken");
  };

  // ///////

  return (
    <BloodBankContext.Provider
      value={{
        bloodBankAuthToken,
        logoutBB,
        registerBloodBank,
        loginBloodBank,
        bloodBankDetails,
        updateBloodBankProfile,
        bloodBankInventory,
        searchMatchDonor,
        searchBloodBanks,
      }}
    >
      {children}
    </BloodBankContext.Provider>
  );
};

// Custom hook for consuming the context
export const useBloodBank = () => {
  const context = useContext(BloodBankContext);
  if (!context) {
    throw new Error("useBloodBank must be used within a BloodBankProvider");
  }
  return context;
};
