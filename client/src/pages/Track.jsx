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

  const currOrder = useSelector((state) => state.order.orderList.filter((order) => order._id === orderId));

  const token = JSON.parse(localStorage.getItem("profile")).token;

  console.log(currOrder, " track", token);

  const baseStationLocation = { lat: 20.1486222, lng: 85.6697336 };
  const [droneLocation, setDroneLocation] = useState(baseStationLocation);

  const order = {
    droneId: currOrder.assignedDrone._id,
    baseStationLocation,
    pickupLocation: currOrder.pickupPoint,
    deliveryLocation: currOrder.deliveryPoint,
    userToken: token
  };

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
        pickupLocation={order.pickupLocation}
        deliveryLocation={order.deliveryLocation}
        droneLocation={droneLocation}
      />
    </LayoutWrapper>
  );
};

export default Track;
