import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Leaflet from "leaflet";
import MapStyles from "../components/Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import LayoutWrapper from "../components/LayoutWrapper";

const droneIcon = Leaflet.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHiSURBVFiF7Ze9TgJREIW/a0JDXDDxTahsLOyESIwdsSA8nbWGzgQaUEwIJPIEvoANhY2JY8Hgjpe7y2UFtWCSaXbPnHN25/46ESErnHNl4AY4FpHTTGC4dgC8Atci8paFO1gj3gUugfdNxDXetbarXOEQka8EHFAHGkAPEGAMVC0uJoGq1opyNZTbfcN54kMtWOYEONpU3HAeKYflHFoTFlz3gALUi4rH8tox4EIdWtvp9RHiSLXUZZm05zYHwOEPvv5QOXzeHlBezkAr/gS0gY4pLGTCEx8oZ5t0TPRUm1sjXvUIhkVMeOJDW8tiYC5nxy0K7BOYakACPIRMaB/PNF2G+AOQZEzRPjCI+ZoEeDQmEuAKeDY9fdZniRF/DImv8Ef+0gowUuJ5YFCJ924EVKK4N+hrBZjliC9zFivurwO5ISJzYBoBnSo2KqIN7Cr2BvYGog045ypALQJaU2xc/PuFiF0vxfxsM7rQLL4ZkW7HY8z5j1/cju2BZMLiDHfO9g8k58r9/UCi4L87khlwKwDsFBU3vJ0Abyu0G76wGh+BZ5tGiCPV8tzee053cTG5z10HgBMW7dj21awFnKzgcgjswOwXMNDHG3ChzNwLZHGlbgJ3QCm+5V9R0tqm5FzPPwErm9VqClDZ8wAAAABJRU5ErkJggg==",
});

const center = {
  lat: 20.1490736,
  lng: 85.6654722,
};

export default function MasterMap() {
  const token = JSON.parse(localStorage.getItem("profile")).token;
  const [droneLocations, setDroneLocations] = useState([]);

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");
    socket.emit("setupAdmin", token);
    socket.on("connected", () => {
      console.log("User successfully connected");
      socket.emit("get-all-locations");
    });
    socket.on("failed", () => {
      console.log("Connection failed");
    });
    socket.on("update-locations", (...args) => {
      setDroneLocations(args[0]);
    });
    socket.on("disconnect", () => {
      socket.disconnect();
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <LayoutWrapper>
      <MapContainer className={MapStyles.map} center={center} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {droneLocations.map((droneLocation, idx) => {
          console.log(droneLocation);
          if(droneLocation){

          }
          return <Marker key={idx} position={droneLocation} icon={droneIcon} />
        })}
      </MapContainer>
    </LayoutWrapper>
  );
}
