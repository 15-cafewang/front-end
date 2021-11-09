import { createSlice } from "@reduxjs/toolkit";

import {
  addBulletinPostDB,
  getBulletinPostListDB,
  getBulletinPostDetailDB,
} from "../Async/bulletinBoard";

const initialstate = {
  isFetching: false,
  boardList: [],
  currentBoardPost: {},
};

const bulletinBoardSlice = createSlice({
  name: "bulletinBoard",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    // 게시글 목록 불러오기
    [getBulletinPostListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBulletinPostListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.boardList = payload;
    },
    [getBulletinPostListDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 게시글 작성
    [addBulletinPostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addBulletinPostDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
    },
    [addBulletinPostDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 게시글 상세 조회
    [getBulletinPostDetailDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBulletinPostDetailDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.currentBoardPost = payload;
    },
    [getBulletinPostDetailDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export default bulletinBoardSlice;
