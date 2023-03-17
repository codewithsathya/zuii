import React from "react";
import Table from "../components/Table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { getOrderList } from "../actions/orders";
import NavBar from "../components/NavBar";
import LayoutWrapper from "../components/LayoutWrapper";

const Home = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(test());
  };
  return (
    <LayoutWrapper>
      <div className="mx-auto h-full w-full max-w-[1300px] items-center justify-center">
          <br />
          <br />

          <div className="text-center">
            <MDBBtn onClick={handleClick}>Book</MDBBtn>
          </div>
          <br />
          <br />
          <MDBContainer>
            <MDBTypography tag="h2">History</MDBTypography>
          </MDBContainer>
          <br />

          <Table />
      </div>
    </LayoutWrapper>
  );
};

export default Home;
