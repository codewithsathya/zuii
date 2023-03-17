import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import orderReducer from "./orders";
import droneReducer from "./drone";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    drone: droneReducer,
  },
});

export default store;
