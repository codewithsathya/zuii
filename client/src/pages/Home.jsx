import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { getOrderList, getRequests } from "../actions/orders";
import AdminTable from "../components/AdminTable";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(getOrderList());
    } else if (user && user.isAdmin) {
      dispatch(getRequests());
    }
  }, [user, dispatch]);

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
      <MDBContainer breakpoint="sm">
        {!user && (
          <Typography>You need to login to view your history</Typography>
        )}
        {user && !user.isAdmin && <Table />}
        {user && user.isAdmin && <AdminTable />}
      </MDBContainer>
    </div>
  );
};

export default Home;
