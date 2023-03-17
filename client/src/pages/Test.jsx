import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Map from "../components/Map";

const Test = () => {
  const [location, setLocation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");
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
      <Map />
    </>
  );
};

export default Test;
