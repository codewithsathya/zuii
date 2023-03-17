import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Map from "../components/Map";
import LayoutWrapper from "../components/LayoutWrapper";

const SERVER_ROUTE = "http://localhost:3000/";

const Test = () => {
  const [queryParams] = useSearchParams();
  const orderId = queryParams.get("orderId");

  const baseStationLocation = { lat: 20.1486222, lng: 85.6697336};
  const [droneLocation, setDroneLocation] = useState(baseStationLocation);

  // const { orderId } = useParams();
  
  const order = {
    droneId: "drone1",
    userId: "uaskj",
    baseStationLocation,
    pickupLocation: { lat: 20.174163375068684, lng: 85.63380051465722},
    deliveryLocation: { lat: 20.16311799434222, lng: 85.6210358461999}
  }

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");
    socket.emit("setup", order);
    socket.on("connected", () => {
      console.log("User successfully connected");
    });
    socket.on("failed", () => {
      console.log("Connection failed");
    });
    socket.on("locationupdate", (...args) => {
      if(args === null){
        args = [baseStationLocation];
      }
      setDroneLocation(args[0])
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <LayoutWrapper>
      <Map baseStationLocation={baseStationLocation} pickupLocation={order.pickupLocation} deliveryLocation={order.deliveryLocation} droneLocation={droneLocation} />
    </LayoutWrapper>
  );
};

export default Test;
