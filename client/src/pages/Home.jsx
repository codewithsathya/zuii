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
    <div>
    {/* <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-center"> */}
      <NavBar />
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
    </div>
  );
};

export default Home;
