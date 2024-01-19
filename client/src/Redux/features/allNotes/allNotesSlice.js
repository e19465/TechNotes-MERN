import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allnotes: [],
  isFetching: false,
  isError: false,
};

const allNotesSlice = createSlice({
  name: "allNotes",
  initialState,
  reducers: {
    allFetchingStart: (state) => {
      state.isFetching = true;
      state.allnotes = [];
      state.isError = false;
    },

    allFetchingSuccess: (state, action) => {
      state.isFetching = false;
      state.allnotes = action.payload;
      state.isError = false;
    },

    allFetchingFailure: (state) => {
      state.isFetching = false;
      state.allnotes = [];
      state.isError = false;
    },
  },
});

export const { allFetchingStart, allFetchingSuccess, allFetchingFailure } =
  allNotesSlice.actions;
export default allNotesSlice.reducer;
