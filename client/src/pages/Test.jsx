import React from "react";
import Map from "../components/Map";
import Admintable from "../components/AdminTable";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import LocationInput from "../components/LocationInput";
import { useSelector } from "react-redux";

const Test = () => {
  const { pickUpCord } = useSelector((state) => state.order);

  return (
    <>
      <h1>
        Pickup Lat: {pickUpCord.lat}
        Lng: {pickUpCord.lng}
      </h1>
    </>
  );
};

export default Test;
