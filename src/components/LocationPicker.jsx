import React, { useState } from "react";
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

const LocationPicker = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Component to capture map clicks and update marker position
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng); // Save the clicked coordinates
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition}></Marker>
    ) : null;
  };

  return (
    <div>
      <h2>Pick a Location on the Map</h2>
      <MapContainer
        center={[12.868640, 74.842635]} // Default map center (London)
        zoom={13}
        style={{ height: "500px", width: "50%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>

      {selectedPosition && (
        <p>
          Selected Coordinates: {selectedPosition.lat}, {selectedPosition.lng}
        </p>
      )}
    </div>
  );
};

export default LocationPicker;
