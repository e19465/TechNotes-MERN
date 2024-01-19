import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  isFetching: false,
  isError: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    fetchingStart: (state) => {
      state.notes = [];
      state.isFetching = true;
      state.isError = false;
    },

    fetchingSuccess: (state, action) => {
      state.notes = action.payload;
      state.isFetching = false;
      state.isError = false;
    },

    fetchingFailure: (state) => {
      state.notes = [];
      state.isFetching = false;
      state.isError = false;
    },

    addNewNote: (state, action) => {
      state.notes.push(action.payload);
    },
  },
});

export const { fetchingStart, fetchingSuccess, fetchingFailure, addNewNote } =
  noteSlice.actions;
export default noteSlice.reducer;
