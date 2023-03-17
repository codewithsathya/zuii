import { React, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import AdminTableRow from "./AdminTableRow";
import Skeleton from "@mui/material/Skeleton";

export default function AdminTable() {
  const [basicActive, setBasicActive] = useState("tab1");
  const { orderList, isLoading } = useSelector((state) => state.order);

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <MDBContainer breakpoint="sm">
      <MDBTabs className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Pending
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Accepted
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        {isLoading && <Skeleton animation="wave" />}
        {!isLoading && (
          <>
            <MDBTabsPane show={basicActive === "tab1"}>
              <MDBTable align="middle" responsive>
                <MDBTableHead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>

                    <th scope="col">Accept</th>
                    <th scope="col">Reject</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {orderList?.map(
                    (order) =>
                      order?.status === "pending" && (
                        <AdminTableRow key={order._id} order={order} />
                      )
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === "tab2"}>
              <MDBTable align="middle" responsive>
                <MDBTableHead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {orderList?.map(
                    (order) =>
                      order?.status === "accepted" && (
                        <AdminTableRow key={order._id} order={order} />
                      )
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBTabsPane>
          </>
        )}
      </MDBTabsContent>
    </MDBContainer>
  );
}
