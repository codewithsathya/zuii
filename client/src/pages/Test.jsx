// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useParams } from "react-router-dom";

// const Test = () => {
//   const [location, setLocation] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const socket = io.connect(SERVER_ROUTE);
//     socket.emit("setup", { id });
//     socket.on("connected", () => {
//       console.log("User successfully connected");
//     });
//     socket.on("failed", () => {
//       console.log("Connection failed");
//     });
//     socket.on("locationupdate", (...args) => {
//       console.log(args);
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <h1>
//         lat: {location.lat}
//         lng: {location.lng}
//       </h1>
//     </>
//   );
// };

// export default Test;
