import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

const noteUpdateSlice = createSlice({
  name: "noteUpdate",
  initialState,
  reducers: {
    updateNoteId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { updateNoteId } = noteUpdateSlice.actions;
export default noteUpdateSlice.reducer;
