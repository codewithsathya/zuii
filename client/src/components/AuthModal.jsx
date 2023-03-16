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
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
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
      // console.log("hi");
    }
  }, [user, handleClose]);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <MDBBtn rounded onClick={user ? handleLogout : handleOpen}>
        {user ? "Logout" : "Login"}
      </MDBBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <GoogleAuth />
        </Box>
      </Modal>
    </>
  );
}
