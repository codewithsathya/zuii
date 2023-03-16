import React from "react";
import Map from "../components/Map";
import Admintable from "../components/admin-table";
import {MDBContainer,MDBTypography } from 'mdb-react-ui-kit';
const Test = () => {
  return <>
  <Map />
  <br />
      <br />
      <MDBContainer breakpoint="sm">
        <MDBTypography tag="h2">Requests</MDBTypography>
      </MDBContainer>
      <br />
  <Admintable />
  </>;
};

export default Test;
