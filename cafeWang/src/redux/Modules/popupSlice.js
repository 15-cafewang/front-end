import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  popUpState: false,
};

const popUpSlice = createSlice({
  name: "popUp",
  initialState: initialstate,
  reducers: {
    togglePopUp: (state, action) => {},
  },
});

export const { togglePopUp } = popUpSlice.actions;

export default popUpSlice;
