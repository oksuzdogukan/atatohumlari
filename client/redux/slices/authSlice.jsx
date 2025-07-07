import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload;
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.admin = null;
      state.isAuthChecked = true;
    },
    checkAuth: (state, action) => {
      state.admin = action.payload; // null olabilir
      state.isAuthChecked = true;
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
