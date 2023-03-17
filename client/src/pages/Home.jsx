import React from "react";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";

const Home = () => {
  return (
    <div>
      <NavBar />
      <br />
      <br />
      <div className="text-center">
        <MDBBtn>Book</MDBBtn>
      </div>
      <br />
      <br />
      <MDBContainer breakpoint="sm">
        <MDBTypography tag="h2">History</MDBTypography>
      </MDBContainer>
      <br />
      <Table />
    </div>
  );
};

export default Home;
