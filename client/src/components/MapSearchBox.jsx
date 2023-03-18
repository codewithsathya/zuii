import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { MDBContainer, MDBTypography, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookOrder } from "../actions/orders";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function MapSearchBox(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectPosition, setSelectPosition, staticLocation } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  console.log(selectPosition, " hi");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%", margin: "10px" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const params = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(params).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err: ", err));
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{
            width: { xs: "100vw", md: "50vw" },
            height: "50vh",
            overflowY: "scroll",
          }}
        >
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    setSelectPosition({
                      lat: Number(item?.lat),
                      lng: Number(item?.lon),
                    });
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB80lEQVRIic3Wu2tUQRQG8F98sIUPUNNZJLFUUPEBIa4KsRA1hY0WBnyBIATzJ2ivrcQi+CgUrbRIZ6WCsCqi2FgJ8dFoloW4YoiJrMWcZdfN7k12A+IHh7n3zDffmTlnZu7lP0AOoyjgR1gBl6JvWdiMt6i0sDfBaYmujL4cXmAHihgPQdiJM3UT6MdsM5GVGQFGcDbER/EB82Ff8BQHsQVf8bKZyIqMAMPRjqOMvbiD29gdvpsN3LZQlvJ8AkOYUsv9VPhOxvv3ViJZK5hdAqdaw1+dBHgf7dZor0v1KMYzbGvgLsCqjACPkMcRvMJrnGvgHI32YSuRrBXcxQz2oKdJfy92BedeJwG+4YaU54sWnpkL4RsLbkfolnJewVVp5wzhWviKwVkWzodYWTp4pzEdvsaadIQuTKjdPdW7aUL2VZOJNdIOORXvGzCpdtA+q6VmGMdizKLokYo2E0K/MRh9ecyF5cN3KDiVGDOm+Y4DB1CqE36GK9hXxxkJq2IAl4NbDVTC/mYBPgbhPvoWXetC9OFBaExWnfXnYD7a1WHtIlc3bq7qrN8Fg9L1sD5m8VxaeiFmVAqDjdgkneZ+Kb0DoTeN43jSbBa9uKVW5Hbsp/R9+KvIrfbxWhyOWW2PQd1YF/1l6ZvwCe9itY+lH4J/iz8Yqo2pSJJrIwAAAABJRU5ErkJggg=="
                      alt="Placeholder Image"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
        <br />
        <div className="text-center">
          <MDBBtn
            onClick={() => {
              if (!staticLocation) {
                props.handleNext();
              } else {
                dispatch(
                  bookOrder(
                    {
                      pickupLatitude: staticLocation.lat,
                      pickupLongitude: staticLocation.lng,
                      deliveryLatitude: selectPosition.lat,
                      deliveryLongitude: selectPosition.lng,
                    },
                    navigate
                  )
                );
              }
            }}
          >
            {!staticLocation ? "Next" : "Submit"}
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}
