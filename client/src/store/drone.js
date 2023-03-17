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
    addFree: (state, action) => {
      state.numberOfFree = state.numberOfFree + 1;
      state.freeDrones.push(action.payload?.data);
    },
    removeFromFree: (state, action) => {
      state.numberOfFree = state.numberOfFree - 1;
      state.freeDrones = state.freeDrones.filter(
        (drone) => drone._id !== action.payload?.data
      );
    },
  },
});

export const droneActions = droneSlice.actions;

export default droneSlice.reducer;
