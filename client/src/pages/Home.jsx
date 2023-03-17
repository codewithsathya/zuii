import React from "react";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { test } from "../actions/user";

const Home = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(test());
  };

  return (
    <>
      <NavBar />
      <div>Home</div>
      <br />
      <br />
      <div className="text-center">
        <MDBBtn onClick={handleClick}>Book</MDBBtn>
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
