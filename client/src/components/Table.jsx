import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import TableRows from "./TableRows";
import { getOrderList } from "../actions/orders";

export default function Table() {
  const { orderList, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log(orderList);

  useEffect(() => {
    if (user) {
      dispatch(getOrderList());
    }
  }, [user, dispatch]);

  return (
    <MDBContainer breakpoint="sm">
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
        <MDBTableBody>
          {orderList?.map((order) => (
            <TableRows key={order._id} order={order} />
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
