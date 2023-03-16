import React from 'react';
import {MDBContainer, MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBFooter } from 'mdb-react-ui-kit';

export default function Table() {
  return (
    <MDBContainer breakpoint="sm">
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>From</th>
          <th scope='col'>To</th>
          <th scope='col'>Status</th>
          <th scope='col'>Track</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              March 29th, 2021
            </div>
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
            <MDBBadge color='success' pill>
              Accepted
            </MDBBadge>
          </td>
          <td>
          <MDBBtn color='success' href='/'>Track</MDBBtn>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              March 29th, 2021
            </div>
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
            <MDBBadge color='warning' pill>
              Pending
            </MDBBadge>
          </td>
          <td>
          <MDBBtn color='success' href='/'>Track</MDBBtn>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              March 29th, 2021
            </div>
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
          20.215296, 85.867792
          </td>
          <td>
            <MDBBadge  color='danger' pill>
              Rejected
            </MDBBadge>
          </td>
          <td>
          <MDBBtn color='success' href='/'>Track</MDBBtn>
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
    </MDBContainer>

    
  );
}