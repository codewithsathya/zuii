import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import orderReducer from "./orders";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
  },
});

export default store;
