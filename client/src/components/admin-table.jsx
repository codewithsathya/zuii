import {React,useState} from 'react';
import {MDBContainer, MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBFooter } from 'mdb-react-ui-kit';
import CheckIcon from '@mui/icons-material/Check';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
export default function Admintable() {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  return (
    <MDBContainer breakpoint="sm">
      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
          Pending
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Accepted
          </MDBTabsLink>
        </MDBTabsItem>
      
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === 'tab1'}>
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
              <MDBBtn color='success' href='/'>Accept</MDBBtn>
              </td>
              <td>
              <MDBBtn color='danger' href='/'>Reject</MDBBtn>
              </td>
            </tr>
          
          </MDBTableBody>
        </MDBTable>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab2'}>
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
              <MDBBtn color='success' href='/'>Accept</MDBBtn>
              </td>
              <td>
              <MDBBtn color='danger' href='/'>Reject</MDBBtn>
              </td>
            </tr>
          
          </MDBTableBody>
        </MDBTable>
        </MDBTabsPane>
       
      </MDBTabsContent>

        


    </MDBContainer>

    
  );
}