import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { acceptOrder, rejectOrder } from "../actions/orders";
import { useNavigate } from "react-router-dom";
import { freeTheDrone } from "../actions/drone";

const AdminTableRow = ({ order }) => {
  const dispatch = useDispatch();

  const handleAcceptOrder = async () => {
    const timeToFree = await dispatch(acceptOrder(order._id));
    console.log(timeToFree);
    setTimeout(() => {
      console.log("dis ");
      dispatch(freeTheDrone(order._id));
    }, [timeToFree * 1000]);
  };

  const handleRejectOrder = () => {
    dispatch(rejectOrder(order._id));
  };

  const navigate = useNavigate();

  const handleClickTrack = () => {
    navigate(`/track/${order._id}`);
  };

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <Avatar
            sx={{ bgcolor: "lightblue", width: "45px", height: "45px" }}
            alt=""
            src={order?.createdBy?.profilePic}
          >
            {order?.createdBy?.name?.charAt(0)}
          </Avatar>
          <div className="ms-3">
            <p className="fw-bold mb-1">{order?.createdBy?.name}</p>
            <p className="text-muted mb-0">{order?.createdBy?.email}</p>
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
            <MDBBtn color="success" onClick={handleAcceptOrder}>
              Accept
            </MDBBtn>
          </td>
          <td>
            <MDBBtn color="danger" onClick={handleRejectOrder}>
              Reject
            </MDBBtn>
          </td>
        </>
      )}
      {order?.status === "accepted" && (
        <>
          <td>
            <MDBBtn color="success" onClick={handleClickTrack}>
              Track
            </MDBBtn>
          </td>
        </>
      )}
    </tr>
  );
};

export default AdminTableRow;
