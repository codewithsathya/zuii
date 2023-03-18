import React, { useCallback, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import Box from "@mui/material/Box";
import GoogleAuth from "./GoogleAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

export default function AuthModal() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(authActions.clearError());
    setOpen(true);
  };
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user, handleClose]);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "50px",
        }}
      >
        <MDBBtn rounded onClick={user ? handleLogout : handleOpen}>
          {user ? "Logout" : "Login"}
        </MDBBtn>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col align-items-center">
            <h1>Welcome to zuii</h1>
            <GoogleAuth />
          </div>
        </Box>
      </Modal>
    </>
  );
}
