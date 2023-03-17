import React, { useState } from "react";
import { useSelector } from "react-redux";

import LocationInput from "../components/LocationInput";

const Book = () => {
  const [staticLocation, setStaticLocation] = useState(null);
  const { pickUpCord } = useSelector((state) => state.order);

  const handleNext = () => {
    console.log("next");
    setStaticLocation(pickUpCord);
  };

  return (
    <>
      <LocationInput staticLocation={staticLocation} handleNext={handleNext} />
    </>
  );
};

export default Book;
