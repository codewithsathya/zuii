import React from "react";
import Map from "../components/Map";
import Admintable from "../components/AdminTable";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import LocationInput from "../components/LocationInput";

const Test = () => {
  return (
    <>
      <LocationInput staticLocation={{ lat: 20.1490736, lng: 85.6654722 }} />
    </>
  );
};

export default Test;
