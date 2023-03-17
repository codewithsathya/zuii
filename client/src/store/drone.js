import { createSlice } from "@reduxjs/toolkit";

const initialDroneState = {
  numberOfFree: 0,
  freeDrones: [],
};

const droneSlice = createSlice({
  name: "drone",
  initialState: initialDroneState,
  reducers: {
    fetchFreeDrones: (state, action) => {
      state.numberOfFree = action.payload?.data.numberOfFree;
      state.freeDrones = action.payload?.data.drones;
    },
  },
});

export const droneActions = droneSlice.actions;

export default droneSlice.reducer;
