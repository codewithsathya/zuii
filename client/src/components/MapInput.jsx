import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB80lEQVRIic3Wu2tUQRQG8F98sIUPUNNZJLFUUPEBIa4KsRA1hY0WBnyBIATzJ2ivrcQi+CgUrbRIZ6WCsCqi2FgJ8dFoloW4YoiJrMWcZdfN7k12A+IHh7n3zDffmTlnZu7lP0AOoyjgR1gBl6JvWdiMt6i0sDfBaYmujL4cXmAHihgPQdiJM3UT6MdsM5GVGQFGcDbER/EB82Ff8BQHsQVf8bKZyIqMAMPRjqOMvbiD29gdvpsN3LZQlvJ8AkOYUsv9VPhOxvv3ViJZK5hdAqdaw1+dBHgf7dZor0v1KMYzbGvgLsCqjACPkMcRvMJrnGvgHI32YSuRrBXcxQz2oKdJfy92BedeJwG+4YaU54sWnpkL4RsLbkfolnJewVVp5wzhWviKwVkWzodYWTp4pzEdvsaadIQuTKjdPdW7aUL2VZOJNdIOORXvGzCpdtA+q6VmGMdizKLokYo2E0K/MRh9ecyF5cN3KDiVGDOm+Y4DB1CqE36GK9hXxxkJq2IAl4NbDVTC/mYBPgbhPvoWXetC9OFBaExWnfXnYD7a1WHtIlc3bq7qrN8Fg9L1sD5m8VxaeiFmVAqDjdgkneZ+Kb0DoTeN43jSbBa9uKVW5Hbsp/R9+KvIrfbxWhyOWW2PQd1YF/1l6ZvwCe9itY+lH4J/iz8Yqo2pSJJrIwAAAABJRU5ErkJggg==",
  iconSize: [38, 38],
});

const position = [51.505, -0.09];

function DraggableMarker({ position, setPosition }) {
  const [draggable, setDraggable] = useState(false);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    console.log("toggleDraggable");
    setDraggable((d) => !d);
  }, []);

  useEffect(() => {
    console.log("Position: ", position);
  }, [position]);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return (
    <>
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={icon}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "PICKUP Marker is draggable"
              : "Click here to make PICKUP marker draggable"}
          </span>
        </Popup>
      </Marker>
    </>
  );
}

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(L.latLng(selectPosition?.lat, selectPosition?.lng), 15, {
        animate: true,
      });
    }
  }, [selectPosition, map]);

  return null;
}

export default function MapInput(props) {
  const { selectPosition, setSelectPosition, staticLocation } = props;

  return (
    <MapContainer
      center={position}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=1gz0yfXteTVOtuh7LQIB"
      />
      {staticLocation && (
        <Marker position={staticLocation} icon={icon}>
          <Popup>
            <span>Pickup Location</span>
          </Popup>
        </Marker>
      )}
      <DraggableMarker
        position={selectPosition}
        setPosition={setSelectPosition}
      />
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
