import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { setActive } = modalSlice.actions;

export default modalSlice;
