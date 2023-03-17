import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";
import AuthModal from "./AuthModal";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { ReactComponent as Logo } from "../logo.svg";

export default function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <Logo />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink
                active
                aria-current="page"
                href="#"
              ></MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <Avatar
            sx={{ bgcolor: "lightblue", mr: "20px" }}
            alt="Remy Sharp"
            src={user?.profilePic}
          >
            {user?.name.charAt(0)}
          </Avatar>

          <AuthModal />
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
