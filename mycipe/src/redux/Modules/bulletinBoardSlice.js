import { createSlice } from "@reduxjs/toolkit";

import { addBulletinPostDB } from "../Async/bulletinBoard";

const initialstate = {
  isfetching: false,
};

const bulletinBoardSlice = createSlice({
  name: "bulletinBoard",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    // 레시피 작성
    [addBulletinPostDB.pending]: (state, action) => {
      state.isfetching = true;
    },
    [addBulletinPostDB.fulfilled]: (state, action) => {
      state.isfetching = false;
    },
    [addBulletinPostDB.fulfilled]: (state, action) => {
      state.isfetching = true;
    },
  },
});

export default bulletinBoardSlice;
