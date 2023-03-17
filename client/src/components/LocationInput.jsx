import React, { useState } from "react";
import SearchBox from "./MapSearchBox";
import Maps from "./MapInput";
import Box from "@mui/material/Box";

function LocationInput() {
  const [selectPosition, setSelectPosition] = useState({
    lat: 20.1490736,
    lng: 85.6654722,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100vw", md: "50vw" },
          height: { xs: "60vh", md: "100vh" },
        }}
      >
        <Maps
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </Box>
      <Box sx={{ width: { xs: "100vw", md: "50vw" } }}>
        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </Box>
    </Box>
  );
}

export default LocationInput;
