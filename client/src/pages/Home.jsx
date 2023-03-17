import React from "react";
import Table from "../components/Table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { getOrderList } from "../actions/orders";
import NavBar from "../components/NavBar";

const Home = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getOrderList());
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
