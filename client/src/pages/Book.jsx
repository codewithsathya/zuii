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
      <div className="text-center">
        {!staticLocation && <h1>Select pick up location</h1>}
        {staticLocation && <h1>Select drop off location</h1>}
      </div>
      <LocationInput staticLocation={staticLocation} handleNext={handleNext} />
    </LayoutWrapper>
  );
};

export default Book;
