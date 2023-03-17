import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableRows from "./TableRows";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@material-ui/core";

export default function Table() {
  const { orderList, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user && orderList.length > 0 && (
        <MDBTable align="middle" responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Status</th>
              <th scope="col">Track</th>
            </tr>
          </MDBTableHead>

          {!isLoading && (
            <MDBTableBody>
              {orderList?.map((order) => (
                <TableRows key={order._id} order={order} />
              ))}
            </MDBTableBody>
          )}
        </MDBTable>
      )}
      {!isLoading && orderList.length === 0 && (
        <Typography>No Booking History</Typography>
      )}
      {isLoading && (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      )}
    </>
  );
}
