import React, { useEffect } from "react";
import Table from "../components/Table";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { getOrderList, getRequests } from "../actions/orders";
import AdminTable from "../components/AdminTable";
import LayoutWrapper from "../components/LayoutWrapper";
import AdImage from "../images/image1.jpg";
import { useNavigate } from "react-router-dom";
import { getFreeDrones } from "../actions/drone";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(getOrderList());
    } else if (user && user.isAdmin) {
      dispatch(getRequests());
      dispatch(getFreeDrones());
    }
  }, [user, dispatch]);

  const navigate = useNavigate();
  const { numberOfFree } = useSelector((state) => state.drone);

  const handleBooking = () => {
    navigate("/book");
  };

  const handleViewMasterMap = () => {
    navigate("/mastermap");
  }

  return (
    <LayoutWrapper>
      <div className="mx-auto h-full w-full max-w-[1300px] items-center justify-center">
        <div className="items-start h-auto w-full flex flex-col justify-items-center align-items-center space-y-2 xl:grid xl:grid-cols-2 xl:gap-x-8 xl:space-y-0 mx-auto justify-between">
          <div className="xl:flex xl:flex-col h-full space-x-2 xl:justify-center">
            <h1 className="p-2">Drone delivery</h1>
            <h3>Experience lightning-fast drone delivery. Order now!</h3>
          </div>
          <div className="flex flex-col">
            <img src={AdImage} alt="AdImage" width={500} height={500} />
          </div>
        </div>

        {user && (
          <div className="text-center">
            {/* <MDBBtn onClick={handleBooking}>
              Book a drone {user.isAdmin && "("} {user.isAdmin && numberOfFree}{" "}
              {user.isAdmin && ")"}
            </MDBBtn> */}
            {!user.isAdmin && <MDBBtn onClick={handleBooking}>
            Book a drone {user.isAdmin && "("} {user.isAdmin && numberOfFree}{" "}
              {user.isAdmin && ")"}
            </MDBBtn>}
            {user.isAdmin && <MDBBtn onClick={handleViewMasterMap}>View all drones {user.isAdmin && "("} {user.isAdmin && numberOfFree}{" "}
              {user.isAdmin && ")"}</MDBBtn>}
          </div>
        )}

        <div className="">
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
      </div>
    </LayoutWrapper>
  );
};

export default Home;
