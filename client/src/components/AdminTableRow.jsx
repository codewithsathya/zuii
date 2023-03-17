import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import Avatar from "@mui/material/Avatar";

const AdminTableRow = ({ order }) => {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <Avatar
            sx={{ bgcolor: "lightblue", width: "45px", height: "45px" }}
            alt=""
            src={order?.createdBy.profilePic}
          >
            {order?.createdBy?.name?.charAt(0)}
          </Avatar>
          <div className="ms-3">
            <p className="fw-bold mb-1">{order?.createdBy.name}</p>
            <p className="text-muted mb-0">{order?.createdBy.email}</p>
          </div>
        </div>
      </td>
      <td>
        {order?.pickUpPoint?.latitude}, {order?.pickUpPoint?.longitude}
      </td>
      <td>
        {order?.deliveryPoint?.latitude}, {order?.deliveryPoint?.longitude}
      </td>
      {order?.status !== "accepted" && (
        <>
          <td>
            <MDBBtn color="success" href="/">
              Accept
            </MDBBtn>
          </td>
          <td>
            <MDBBtn color="danger" href="/">
              Reject
            </MDBBtn>
          </td>
        </>
      )}
    </tr>
  );
};

export default AdminTableRow;
