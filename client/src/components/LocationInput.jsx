import React, { useState, useEffect } from "react";
import MapSearchBox from "./MapSearchBox";
import MapInput from "./MapInput";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { orderActions } from "../store/orders";

function LocationInput({ staticLocation, handleNext }) {
  const dispatch = useDispatch();
  const [selectPosition, setSelectPosition] = useState({
    lat: 20.1490736,
    lng: 85.6654722,
  });

  useEffect(() => {
    if (!staticLocation) {
      const { lat, lng } = selectPosition;
      const tempPickupPosition = { lat, lng };
      dispatch(orderActions.setPickupCord({ data: tempPickupPosition }));
    }
  }, [selectPosition, dispatch, staticLocation]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100vw",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100vw", md: "50vw" },
          height: { xs: "60vh", md: "100vh" },
        }}
      >
        <MapInput
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
          staticLocation={staticLocation}
        />
      </Box>
      <Box sx={{ width: { xs: "100vw", md: "50vw" } }}>
        <MapSearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
          staticLocation={staticLocation}
          handleNext={handleNext}
        />
      </Box>
    </Box>
  );
}

export default LocationInput;
