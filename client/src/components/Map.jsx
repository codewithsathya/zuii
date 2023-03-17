import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import MapStyles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
  useMapEvents,
} from "react-leaflet";

const baseStationIcon = Leaflet.icon({
  iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB80lEQVRIic3Wu2tUQRQG8F98sIUPUNNZJLFUUPEBIa4KsRA1hY0WBnyBIATzJ2ivrcQi+CgUrbRIZ6WCsCqi2FgJ8dFoloW4YoiJrMWcZdfN7k12A+IHh7n3zDffmTlnZu7lP0AOoyjgR1gBl6JvWdiMt6i0sDfBaYmujL4cXmAHihgPQdiJM3UT6MdsM5GVGQFGcDbER/EB82Ff8BQHsQVf8bKZyIqMAMPRjqOMvbiD29gdvpsN3LZQlvJ8AkOYUsv9VPhOxvv3ViJZK5hdAqdaw1+dBHgf7dZor0v1KMYzbGvgLsCqjACPkMcRvMJrnGvgHI32YSuRrBXcxQz2oKdJfy92BedeJwG+4YaU54sWnpkL4RsLbkfolnJewVVp5wzhWviKwVkWzodYWTp4pzEdvsaadIQuTKjdPdW7aUL2VZOJNdIOORXvGzCpdtA+q6VmGMdizKLokYo2E0K/MRh9ecyF5cN3KDiVGDOm+Y4DB1CqE36GK9hXxxkJq2IAl4NbDVTC/mYBPgbhPvoWXetC9OFBaExWnfXnYD7a1WHtIlc3bq7qrN8Fg9L1sD5m8VxaeiFmVAqDjdgkneZ+Kb0DoTeN43jSbBa9uKVW5Hbsp/R9+KvIrfbxWhyOWW2PQd1YF/1l6ZvwCe9itY+lH4J/iz8Yqo2pSJJrIwAAAABJRU5ErkJggg==",
  });

const pickupIcon = Leaflet.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB80lEQVRIic3Wu2tUQRQG8F98sIUPUNNZJLFUUPEBIa4KsRA1hY0WBnyBIATzJ2ivrcQi+CgUrbRIZ6WCsCqi2FgJ8dFoloW4YoiJrMWcZdfN7k12A+IHh7n3zDffmTlnZu7lP0AOoyjgR1gBl6JvWdiMt6i0sDfBaYmujL4cXmAHihgPQdiJM3UT6MdsM5GVGQFGcDbER/EB82Ff8BQHsQVf8bKZyIqMAMPRjqOMvbiD29gdvpsN3LZQlvJ8AkOYUsv9VPhOxvv3ViJZK5hdAqdaw1+dBHgf7dZor0v1KMYzbGvgLsCqjACPkMcRvMJrnGvgHI32YSuRrBXcxQz2oKdJfy92BedeJwG+4YaU54sWnpkL4RsLbkfolnJewVVp5wzhWviKwVkWzodYWTp4pzEdvsaadIQuTKjdPdW7aUL2VZOJNdIOORXvGzCpdtA+q6VmGMdizKLokYo2E0K/MRh9ecyF5cN3KDiVGDOm+Y4DB1CqE36GK9hXxxkJq2IAl4NbDVTC/mYBPgbhPvoWXetC9OFBaExWnfXnYD7a1WHtIlc3bq7qrN8Fg9L1sD5m8VxaeiFmVAqDjdgkneZ+Kb0DoTeN43jSbBa9uKVW5Hbsp/R9+KvIrfbxWhyOWW2PQd1YF/1l6ZvwCe9itY+lH4J/iz8Yqo2pSJJrIwAAAABJRU5ErkJggg==",
});

const deliveryIcon = Leaflet.icon({
  iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB80lEQVRIic3Wu2tUQRQG8F98sIUPUNNZJLFUUPEBIa4KsRA1hY0WBnyBIATzJ2ivrcQi+CgUrbRIZ6WCsCqi2FgJ8dFoloW4YoiJrMWcZdfN7k12A+IHh7n3zDffmTlnZu7lP0AOoyjgR1gBl6JvWdiMt6i0sDfBaYmujL4cXmAHihgPQdiJM3UT6MdsM5GVGQFGcDbER/EB82Ff8BQHsQVf8bKZyIqMAMPRjqOMvbiD29gdvpsN3LZQlvJ8AkOYUsv9VPhOxvv3ViJZK5hdAqdaw1+dBHgf7dZor0v1KMYzbGvgLsCqjACPkMcRvMJrnGvgHI32YSuRrBXcxQz2oKdJfy92BedeJwG+4YaU54sWnpkL4RsLbkfolnJewVVp5wzhWviKwVkWzodYWTp4pzEdvsaadIQuTKjdPdW7aUL2VZOJNdIOORXvGzCpdtA+q6VmGMdizKLokYo2E0K/MRh9ecyF5cN3KDiVGDOm+Y4DB1CqE36GK9hXxxkJq2IAl4NbDVTC/mYBPgbhPvoWXetC9OFBaExWnfXnYD7a1WHtIlc3bq7qrN8Fg9L1sD5m8VxaeiFmVAqDjdgkneZ+Kb0DoTeN43jSbBa9uKVW5Hbsp/R9+KvIrfbxWhyOWW2PQd1YF/1l6ZvwCe9itY+lH4J/iz8Yqo2pSJJrIwAAAABJRU5ErkJggg==",
})

const droneIcon = Leaflet.icon({
  iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHiSURBVFiF7Ze9TgJREIW/a0JDXDDxTahsLOyESIwdsSA8nbWGzgQaUEwIJPIEvoANhY2JY8Hgjpe7y2UFtWCSaXbPnHN25/46ESErnHNl4AY4FpHTTGC4dgC8Atci8paFO1gj3gUugfdNxDXetbarXOEQka8EHFAHGkAPEGAMVC0uJoGq1opyNZTbfcN54kMtWOYEONpU3HAeKYflHFoTFlz3gALUi4rH8tox4EIdWtvp9RHiSLXUZZm05zYHwOEPvv5QOXzeHlBezkAr/gS0gY4pLGTCEx8oZ5t0TPRUm1sjXvUIhkVMeOJDW8tiYC5nxy0K7BOYakACPIRMaB/PNF2G+AOQZEzRPjCI+ZoEeDQmEuAKeDY9fdZniRF/DImv8Ef+0gowUuJ5YFCJ924EVKK4N+hrBZjliC9zFivurwO5ISJzYBoBnSo2KqIN7Cr2BvYGog045ypALQJaU2xc/PuFiF0vxfxsM7rQLL4ZkW7HY8z5j1/cju2BZMLiDHfO9g8k58r9/UCi4L87khlwKwDsFBU3vJ0Abyu0G76wGh+BZ5tGiCPV8tzee053cTG5z10HgBMW7dj21awFnKzgcgjswOwXMNDHG3ChzNwLZHGlbgJ3QCm+5V9R0tqm5FzPPwErm9VqClDZ8wAAAABJRU5ErkJggg=="
})


const center = {
  lat: 20.1490736,
  lng: 85.6654722,
};

const limeOptions = { color: "lime" };

const polyline = [
  [0, 0],
  [10, 10],
  // [51.51, -0.12],
];

// function DraggableMarker() {
//   const [path, setPath] = useState([]);

//   const [draggable1, setDraggable1] = useState(false);
//   const [draggable2, setDraggable2] = useState(false);
//   const [position1, setPosition1] = useState({
//     lat: 20.147,
//     lng: 85.69,
//   });
//   const [position2, setPosition2] = useState({
//     lat: 20.145,
//     lng: 85.66,
//   });

//   const markerRef1 = useRef(null);
//   const markerRef2 = useRef(null);

//   const eventHandlers1 = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef1.current;
//         if (marker != null) {
//           setPosition1(marker.getLatLng());
//         }
//       },
//     }),
//     []
//   );

//   const eventHandlers2 = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef2.current;
//         if (marker != null) {
//           setPosition2(marker.getLatLng());
//         }
//       },
//     }),
//     []
//   );

//   const toggleDraggable1 = useCallback(() => {
//     setDraggable1((d) => !d);
//   }, []);

//   const toggleDraggable2 = useCallback(() => {
//     setDraggable2((d) => !d);
//   }, []);

//   useEffect(() => {
//     console.log("1 ", position1);
//     console.log("2 ", position2);
//   }, [position1, position2]);

//   const handlePath = () => {
//     console.log("clicked");
//     const arr1 = [position1.lat, position1.lng];
//     const arr2 = [position1.lat, position2.lng];
//     setPath([arr1, arr2]);
//   };
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition1(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return (
//     <>
//       <Marker
//         draggable={draggable1}
//         eventHandlers={eventHandlers1}
//         position={position1}
//         ref={markerRef1}
//         icon={icon1}
//         onClick={handlePath}
//       >
//         <Popup minWidth={90}>
//           <span onClick={toggleDraggable1}>
//             {draggable1
//               ? "PICKUP Marker is draggable"
//               : "Click here to make PICKUP marker draggable"}
//           </span>
//         </Popup>
//       </Marker>
//       <Marker
//         draggable={draggable2}
//         eventHandlers={eventHandlers2}
//         position={position2}
//         ref={markerRef2}
//         icon={icon2}
//         onClick={handlePath}
//       >
//         <Popup minWidth={90}>
//           <span onClick={toggleDraggable2}>
//             {draggable2
//               ? "DROP OFF Marker is draggable"
//               : "Click here to make DROP OFF marker draggable"}
//           </span>
//         </Popup>
//       </Marker>

//       <Polyline positions={path} />
//       <Polyline pathOptions={limeOptions} positions={path} />
//     </>
//   );
// }

const Map = ({ baseStationLocation, pickupLocation, deliveryLocation, droneLocation}) => {
  return (
    <MapContainer className={MapStyles.map} center={center} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {baseStationLocation && <Marker position={baseStationLocation} icon={baseStationIcon}>
        <Tooltip permanent>
          Base Station
        </Tooltip>
      </Marker>}

      {pickupLocation && <Marker position={pickupLocation} icon={pickupIcon}>
        <Tooltip permanent>
          Pickup point
        </Tooltip>
      </Marker>}

      {deliveryLocation && <Marker position={deliveryLocation} icon={deliveryIcon}>
        <Tooltip permanent>
          Drop point
        </Tooltip>
      </Marker>}

      {droneLocation && <Marker position={droneLocation} icon={droneIcon}>
        <Tooltip permanent>
          Drone
        </Tooltip>
      </Marker>}


    </MapContainer>
  );
};

export default Map;
