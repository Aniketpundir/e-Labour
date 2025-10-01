import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { StoreContext } from "../../Context/StoreContext";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Component to auto fit map on marker
const SetViewOnMarker = ({ lati, longi }) => {
    const map = useMap();

    useEffect(() => {
        if (lati && longi) {
            map.setView([lati, longi], 15); // zoom = 15 (adjust as needed)
        }
    }, [lati, longi, map]);

    return null;
};

const LocationMap = () => {
    const { address, lati, longi } = useContext(StoreContext);

    return (
        <div style={{ height: "400px", width: "100%" }}>
            <MapContainer
                center={[lati, longi]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lati, longi]}>
                    <Popup>
                        <b>Address:</b>
                        <br />
                        {address}
                    </Popup>
                </Marker>

                {/* Auto zoom component */}
                <SetViewOnMarker lati={lati} longi={longi} />
            </MapContainer>
        </div>
    );
};

export default LocationMap;
