import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authenticate: (state, action) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...action.payload?.data,
          token: action.payload?.token,
        })
      );
      state.user = action.payload?.data;
      state.error = null;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
