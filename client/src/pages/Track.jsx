import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Map from "../components/Map";
import LayoutWrapper from "../components/LayoutWrapper";
import { useSelector } from "react-redux";

const Track = () => {
  const { orderId } = useParams();
  // const orderId = queryParams.get("orderId");
  console.log(orderId);
  const currOrder = useSelector((state) => state.order.orderList.filter((order) => order._id === orderId))[0];

  const token = JSON.parse(localStorage.getItem("profile")).token;

  console.log(currOrder, " track", token);

  const baseStationLocation = { lat: 20.149642, lng: 85.673601 };

  const [droneLocation, setDroneLocation] = useState(baseStationLocation);

  const order = {
    droneId: currOrder?.assignedDrone?._id,
    baseStationLocation,
    pickupLocation: { lat: currOrder?.pickUpPoint?.latitude, lng: currOrder?.pickUpPoint?.longitude },
    deliveryLocation: { lat: currOrder?.deliveryPoint?.latitude, lng: currOrder?.deliveryPoint?.longitude },
    userToken: token
  };

  console.log(order, "kaskdkaks");

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");
    socket.emit("setup", order);
    socket.on("connected", () => {
      console.log("User successfully connected");
      socket.emit("getlocation");
    });
    socket.on("failed", () => {
      console.log("Connection failed");
    });
    socket.on("locationupdate", (...args) => {
      if (args === null) {
        args = [droneLocation];
      }
      setDroneLocation(args[0]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <LayoutWrapper>
      <Map
        baseStationLocation={baseStationLocation}
        pickupLocation={order?.pickupLocation}
        deliveryLocation={order?.deliveryLocation}
        droneLocation={droneLocation}
      />
      {console.log(order?.pickupLocation)};
      {console.log(order?.deliveryLocation)}
      {console.log(order?.droneLocation)};
    </LayoutWrapper>
  );
};

export default Track;
