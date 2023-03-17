import { createSlice } from "@reduxjs/toolkit";

const initialOrdersState = {
  orderList: [],
  isLoading: false,
  pickUpCord: { lat: 20.1490736, lng: 85.6654722 },
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrdersState,
  reducers: {
    fetchOrdersList: (state, action) => {
      state.orderList = action.payload?.data;
      console.log(state.orderList);
    },
    addOrder: (state, action) => {
      state.orderList.push(action.payload?.data);
    },
    accept: (state, action) => {
      state.orderList = state.orderList.map((order) => {
        if (order._id === action.payload?.data._id) {
          return action.payload?.data;
        } else {
          return order;
        }
      });
    },
    reject: (state, action) => {
      state.orderList = state.orderList.filter((order) => {
        return order._id !== action.payload?.data;
      });
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    setPickupCord: (state, action) => {
      state.pickUpCord = action.payload?.data;
      console.log(state.pickUpCord, " store");
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
