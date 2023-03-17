import React from "react";

import LocationInput from "../components/LocationInput";

const Book = ({ staticLocation }) => {
  return (
    <>
      <LocationInput staticLocation={staticLocation} />
    </>
  );
};

export default Book;
