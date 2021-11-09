import { createSlice } from "@reduxjs/toolkit";

import {
  addBulletinPostDB,
  getBulletinBoardListDB,
} from "../Async/bulletinBoard";

const initialstate = {
  isfetching: false,
  boardList: [],
};

const bulletinBoardSlice = createSlice({
  name: "bulletinBoard",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    // 게시글 목록 불러오기
    [getBulletinBoardListDB.pending]: (state, action) => {
      state.isfetching = true;
    },
    [getBulletinBoardListDB.fulfilled]: (state, action) => {
      state.isfetching = false;
      state.boardList = action.payload;
    },
    [getBulletinBoardListDB.rejected]: (state, action) => {
      state.isfetching = false;
    },
    // 게시글 작성
    [addBulletinPostDB.pending]: (state, action) => {
      state.isfetching = true;
    },
    [addBulletinPostDB.fulfilled]: (state, action) => {
      state.isfetching = false;
    },
    [addBulletinPostDB.rejected]: (state, action) => {
      state.isfetching = false;
    },
  },
});

export default bulletinBoardSlice;
