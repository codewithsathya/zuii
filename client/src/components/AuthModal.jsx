import React, { useCallback } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(authActions.clearError());
    setOpen(true);
  };
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <MDBBtn rounded onClick={handleOpen}>
        Login
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
