import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams, useSearchParams } from "react-router-dom";

const SERVER_ROUTE = "http://localhost:3000/";

const Test = () => {
  const [queryParams] = useSearchParams();
  const orderId = queryParams.get("orderId");

  console.log(orderId);

  const [location, setLocation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const socket = io.connect(SERVER_ROUTE);
    socket.emit("setup", { id });
    socket.on("connected", () => {
      console.log("User successfully connected");
    });
    socket.on("failed", () => {
      console.log("Connection failed");
    });
    socket.on("locationupdate", (...args) => {
      console.log(args);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>
        lat: {location.lat}
        lng: {location.lng}
      </h1>
    </>
  );
};

export default Test;
