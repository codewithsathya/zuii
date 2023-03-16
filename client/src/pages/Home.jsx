import React from "react";
import NavBar from "../components/NavBar";
import Table from "../components/table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";

const Home = () => {
  return (
    <>
      <NavBar />
      <div>Home</div>
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
    </>
  );
};

export default Home;
