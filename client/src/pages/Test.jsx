import React from "react";
import Map from "../components/Map";
import Admintable from "../components/AdminTable";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import LocationInput from "./LocationInput";

const Test = () => {
  return (
    <>
      <Map />
      <br />
      <br />
      <MDBContainer breakpoint="sm">
        <MDBTypography tag="h2">Requests</MDBTypography>
      </MDBContainer>
      <br />
      <Admintable />
      <br />
      <LocationInput />
    </>
  );
};

export default Test;
