import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload;
    },
    logout: (state) => {
      state.admin = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducers;
