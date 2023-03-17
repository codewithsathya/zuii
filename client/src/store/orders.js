import { createSlice } from "@reduxjs/toolkit";

const initialOrdersState = {
  orderList: [],
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrdersState,
  reducers: {
    fetchOrdersList: (state, action) => {
      state.orderList = action.payload?.data;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
