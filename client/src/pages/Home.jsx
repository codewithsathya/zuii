import React, { useEffect } from "react";
import Table from "../components/Table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { getOrderList, getRequests } from "../actions/orders";
import AdminTable from "../components/AdminTable";
import LayoutWrapper from "../components/LayoutWrapper";

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
    <LayoutWrapper>
      <div className="mx-auto h-full w-full max-w-[1300px] items-center justify-center">
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
    </LayoutWrapper>
  );
};

export default Home;
