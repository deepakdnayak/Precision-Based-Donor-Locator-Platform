import React, { useState } from "react";

const LocationFetcher = () => {
  const [locationData, setLocationData] = useState({
    coordinates: { latitude: null, longitude: null },
    locationDetails: null,
  });
  const [error, setError] = useState(null);
  const [nearestDevice, setNearestDevice] = useState(null);

  // Predefined list of devices with their coordinates
  const devices = [
    { id: 1, latitude: 12.2958104, longitude: 76.6393805 }, // Device 1
    { id: 2, latitude: 13.0826802, longitude: 80.2707184 }, // Device 2
    { id: 3, latitude: 15.3172775, longitude: 75.7138884 }, // Device 3
  ];

  // Convert degrees to radians
  const toRadians = (degree) => degree * (Math.PI / 180.0);

  // Haversine formula to calculate distance between two points
  const haversine = (lat1, lon1, lat2, lon2) => {
    const EARTH_RADIUS = 6371; // Radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c; // Distance in kilometers
  };

  const findNearestDevice = () => {
    const { latitude, longitude } = locationData.coordinates;

    if (!latitude || !longitude) {
      setError("Current location is unavailable to find the nearest device.");
      return;
    }

    let minDistance = Infinity;
    let nearest = null;

    devices.forEach((device) => {
      const distance = haversine(latitude, longitude, device.latitude, device.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = { ...device, distance };
      }
    });

    setNearestDevice(nearest);
  };

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData((prevData) => ({
          ...prevData,
          coordinates: { latitude, longitude },
        }));
        setError(null);

        try {
          // Fetch location details using OpenStreetMap's Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          if (data) {
            setLocationData((prevData) => ({
              ...prevData,
              locationDetails: data,
            }));
          } else {
            setError("Failed to fetch location details.");
          }
        } catch (err) {
          setError("Error while fetching location details.");
        }
      },
      (err) => {
        setError("Unable to retrieve location: " + err.message);
      }
    );
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <h2>Location Fetcher</h2>
      <button onClick={getLocation} className="btn btn-primary">
        Allow Location Access
      </button>

      {locationData.coordinates.latitude && locationData.coordinates.longitude && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Coordinates:</strong> Latitude: {locationData.coordinates.latitude}, Longitude:{" "}
            {locationData.coordinates.longitude}
          </p>
          {locationData.locationDetails && (
            <p>
              <strong>Address:</strong> {locationData.locationDetails.display_name}
            </p>
          )}
          <button onClick={findNearestDevice} className="btn btn-info">
            Find Nearest Device
          </button>

          {nearestDevice && (
            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Nearest Device ID:</strong> {nearestDevice.id}
              </p>
              <p>
                <strong>Coordinates:</strong> Latitude: {nearestDevice.latitude}, Longitude:{" "}
                {nearestDevice.longitude}
              </p>
              <p>
                <strong>Distance:</strong> {nearestDevice.distance.toFixed(2)} km
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
};

export default LocationFetcher;
