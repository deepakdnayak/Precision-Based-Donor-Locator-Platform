import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationPicker = ({ onLocationSelected }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentCoordinates, setCurrentCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const recordLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    recordLocation();
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng);
        onLocationSelected(e.latlng); // Pass the coordinates back to the parent
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition}></Marker>
    ) : null;
  };

  return (
    <div>
      <h2>Pick a Location on the Map</h2>
      {currentCoordinates.latitude && currentCoordinates.longitude ? (
        <MapContainer
          center={[currentCoordinates.latitude, currentCoordinates.longitude]}
          zoom={13}
          style={{
            height: "500px",
            width: window.innerWidth <= 768 ? "90%" : "50%",
            margin: "0 auto", // Center map on large screens
            padding: window.innerWidth <= 768 ? "10px" : "0",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default LocationPicker;
