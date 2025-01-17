import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  user: null,
  isFetching: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.isFetching = true;
      state.isError = false;
    },

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isError = false;
    },

    loginFailure: (state) => {
      state.user = null;
      state.isFetching = false;
      state.isError = true;
    },

    logout: (state) => {
      state.user = null;
      state.isFetching = false;
      state.isError = false;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.user = null;
      state.isFetching = false;
      state.isError = false;
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
