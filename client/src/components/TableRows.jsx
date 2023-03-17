import React from "react";
import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TableRows = ({ order }) => {
  let color = "warning";
  if (order.status === "accepted") {
    color = "success";
  } else if (order.status === "rejected") {
    color = "danger";
  }

  const navigate = useNavigate();

  const handleClickTrack = () => {
    navigate(`/track/${order._id}`);
  };

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          {moment().format("MMMM Do YYYY", order?.createdAt)}
        </div>
      </td>
      <td>
        {order?.pickUpPoint.latitude}, {order?.pickUpPoint.longitude}
      </td>
      <td>
        {order?.deliveryPoint.latitude}, {order?.deliveryPoint.longitude}
      </td>
      <td>
        <MDBBadge color={color} pill>
          {order.status}
        </MDBBadge>
      </td>
      <td>
        <MDBBtn color="success" onClick={handleClickTrack}>
          Track
        </MDBBtn>
      </td>
    </tr>
  );
};

export default TableRows;
