import React from 'react';
import {MDBContainer, MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBFooter } from 'mdb-react-ui-kit';
import CheckIcon from '@mui/icons-material/Check';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
export default function Admintable() {
  return (
    <MDBContainer breakpoint="sm">
        
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>From</th>
          <th scope='col'>To</th>
         
          <th scope='col'>Accept</th>
          <th scope='col'>Reject</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>Alex Ray</p>
                <p className='text-muted mb-0'>alex.ray@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
            <a href='/'><ThumbUpIcon /></a>
          </td>
          <td>
            <a href='/'><ThumbDownIcon /></a>
          </td>
        </tr>
       
      </MDBTableBody>
    </MDBTable>

    </MDBContainer>

    
  );
}