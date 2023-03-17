import React, { useState } from "react";
import SearchBox from "../components/MapSearchBox";
import Maps from "../components/MapInput";
import Box from "@mui/material/Box";

function LocationInput() {
  const [selectPosition, setSelectPosition] = useState(null);

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
        <Maps selectPosition={selectPosition} />
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
