import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapStyles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";

const icon1 = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB80lEQVRIic3Wu2tUQRQG8F98sIUPUNNZJLFUUPEBIa4KsRA1hY0WBnyBIATzJ2ivrcQi+CgUrbRIZ6WCsCqi2FgJ8dFoloW4YoiJrMWcZdfN7k12A+IHh7n3zDffmTlnZu7lP0AOoyjgR1gBl6JvWdiMt6i0sDfBaYmujL4cXmAHihgPQdiJM3UT6MdsM5GVGQFGcDbER/EB82Ff8BQHsQVf8bKZyIqMAMPRjqOMvbiD29gdvpsN3LZQlvJ8AkOYUsv9VPhOxvv3ViJZK5hdAqdaw1+dBHgf7dZor0v1KMYzbGvgLsCqjACPkMcRvMJrnGvgHI32YSuRrBXcxQz2oKdJfy92BedeJwG+4YaU54sWnpkL4RsLbkfolnJewVVp5wzhWviKwVkWzodYWTp4pzEdvsaadIQuTKjdPdW7aUL2VZOJNdIOORXvGzCpdtA+q6VmGMdizKLokYo2E0K/MRh9ecyF5cN3KDiVGDOm+Y4DB1CqE36GK9hXxxkJq2IAl4NbDVTC/mYBPgbhPvoWXetC9OFBaExWnfXnYD7a1WHtIlc3bq7qrN8Fg9L1sD5m8VxaeiFmVAqDjdgkneZ+Kb0DoTeN43jSbBa9uKVW5Hbsp/R9+KvIrfbxWhyOWW2PQd1YF/1l6ZvwCe9itY+lH4J/iz8Yqo2pSJJrIwAAAABJRU5ErkJggg==",
});

const icon2 = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB80lEQVRIic3Wu2tUQRQG8F98sIUPUNNZJLFUUPEBIa4KsRA1hY0WBnyBIATzJ2ivrcQi+CgUrbRIZ6WCsCqi2FgJ8dFoloW4YoiJrMWcZdfN7k12A+IHh7n3zDffmTlnZu7lP0AOoyjgR1gBl6JvWdiMt6i0sDfBaYmujL4cXmAHihgPQdiJM3UT6MdsM5GVGQFGcDbER/EB82Ff8BQHsQVf8bKZyIqMAMPRjqOMvbiD29gdvpsN3LZQlvJ8AkOYUsv9VPhOxvv3ViJZK5hdAqdaw1+dBHgf7dZor0v1KMYzbGvgLsCqjACPkMcRvMJrnGvgHI32YSuRrBXcxQz2oKdJfy92BedeJwG+4YaU54sWnpkL4RsLbkfolnJewVVp5wzhWviKwVkWzodYWTp4pzEdvsaadIQuTKjdPdW7aUL2VZOJNdIOORXvGzCpdtA+q6VmGMdizKLokYo2E0K/MRh9ecyF5cN3KDiVGDOm+Y4DB1CqE36GK9hXxxkJq2IAl4NbDVTC/mYBPgbhPvoWXetC9OFBaExWnfXnYD7a1WHtIlc3bq7qrN8Fg9L1sD5m8VxaeiFmVAqDjdgkneZ+Kb0DoTeN43jSbBa9uKVW5Hbsp/R9+KvIrfbxWhyOWW2PQd1YF/1l6ZvwCe9itY+lH4J/iz8Yqo2pSJJrIwAAAABJRU5ErkJggg==",
});

const Map = () => {
  const [center1, setCenter1] = useState([0, 0]);
  const [center2, setCenter2] = useState([10, 10]);

  const EventHandler = (center) => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
        setCenter1([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <MapContainer className={MapStyles.map} center={center1} zoom={1}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center1} icon={icon1} />
      <Marker position={center2} icon={icon2} />
      <EventHandler centerState={center1} />
    </MapContainer>
  );
};

export default Map;
