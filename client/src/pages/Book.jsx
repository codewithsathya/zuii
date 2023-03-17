import React, { useState } from "react";
import { useSelector } from "react-redux";

import LocationInput from "../components/LocationInput";
import LayoutWrapper from "../components/LayoutWrapper";

const Book = () => {
  const [staticLocation, setStaticLocation] = useState(null);
  const { pickUpCord } = useSelector((state) => state.order);

  const handleNext = () => {
    console.log("next");
    setStaticLocation(pickUpCord);
  };

  return (
    <LayoutWrapper>
      <div>
        {!staticLocation && "Select pick up location"}
        {staticLocation && "Select drop off location"}
      </div>
      <LocationInput staticLocation={staticLocation} handleNext={handleNext} />
    </LayoutWrapper>
  );
};

export default Book;
