import React from "react";
import Table from "../components/table";
import { MDBContainer, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';

const Test = () => {
  return( 
    <>
    <br />
    <br />
     <div className="text-center">
    <MDBBtn>Book</MDBBtn>
    </div>
    <br />
    <br />
      <MDBContainer breakpoint="sm"><MDBTypography tag='h2'>History</MDBTypography></MDBContainer>
      <br />
      
     <Table />
    </>
    );
};

export default Test;

