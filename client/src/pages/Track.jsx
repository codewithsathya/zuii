import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Map from "../components/Map";
import LayoutWrapper from "../components/LayoutWrapper";
import { useSelector } from "react-redux";

const Track = () => {
  const { orderId } = useParams();
  const currOrder = useSelector((state) =>
    state.order.orderList.filter((order) => order._id === orderId)
  )[0];
  const token = JSON.parse(localStorage.getItem("profile")).token;
  const baseStationLocation = { lat: 20.149642, lng: 85.673601 };
  const [droneLocation, setDroneLocation] = useState(baseStationLocation);
  const order = {
    id: currOrder?._id,
    droneId: currOrder?.assignedDrone?._id,
    baseStationLocation,
    pickupLocation: {
      lat: currOrder?.pickUpPoint?.latitude,
      lng: currOrder?.pickUpPoint?.longitude,
    },
    deliveryLocation: {
      lat: currOrder?.deliveryPoint?.latitude,
      lng: currOrder?.deliveryPoint?.longitude,
    },
    userToken: token,
  };

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
    socket.on("disconnect", () => {
      socket.disconnect();
    });
    socket.on("hi", () => {
      console.log("Hi");
    })
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
    </LayoutWrapper>
  );
};

export default Track;
