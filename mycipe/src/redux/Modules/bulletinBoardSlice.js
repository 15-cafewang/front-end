import { createSlice } from "@reduxjs/toolkit";

import {
  addBulletinPostDB,
  getBulletinPostListDB,
  getInfinityScrollDB,
  getBulletinPostDetailDB,
  bulletinLikeToggleDB,
  editBulletinPostDB,
  deleteBulletinPostDB,
  addBulletinCommentDB,
  getBulletinCommentDB,
} from "../Async/bulletinBoard";

const initialstate = {
  isFetching: false,
  boardList: [],
  currentBoardPost: null,
  commentList: null,
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
    // 무한 스크롤
    [getInfinityScrollDB.pending]: (state, acton) => {
      state.isFetching = true;
    },
    [getInfinityScrollDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.boardList = [...state.boardList, ...payload];
    },
    [getInfinityScrollDB.rejected]: (state, acton) => {
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
    // 게시글 좋아요 토글
    [bulletinLikeToggleDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [bulletinLikeToggleDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [bulletinLikeToggleDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 게시글 수정
    [editBulletinPostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [editBulletinPostDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [editBulletinPostDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 게시글 삭제
    [deleteBulletinPostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [deleteBulletinPostDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [deleteBulletinPostDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 게시판 댓글 추가
    [addBulletinCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addBulletinCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commentList.unshift(payload);
      window.alert("댓글 작성 성공!");
    },
    [addBulletinCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 게시판 댓글 조회
    [getBulletinCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBulletinCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commentList = payload;
    },
    [getBulletinCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export const { bulletinLikeToggle } = bulletinBoardSlice.actions;

export default bulletinBoardSlice;
