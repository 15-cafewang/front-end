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
  editBulletinCommentDB,
  deleteBulletinCommentDB,
  bulletinCommentLikeDB,
  getInfinityScrollBulletinCommentDB,
} from "../Async/bulletinBoard";

const initialstate = {
  isLoading: false,

  isFetching: false,
  boardList: [],
  currentBoardPost: null,
  commentList: [],
};

const bulletinBoardSlice = createSlice({
  name: "bulletinBoard",
  initialState: initialstate,
  reducers: {
    setIsBoardLoading: (state, action) => {
      state.isLoading = false;
    },
  },
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
      state.isLoading = true;
    },
    [addBulletinPostDB.fulfilled]: (state, { payload }) => {},
    [addBulletinPostDB.rejected]: (state, action) => {
      state.isLoading = false;
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
      state.isLoading = true;
    },
    [editBulletinPostDB.fulfilled]: (state, action) => {},
    [editBulletinPostDB.rejected]: (state, action) => {
      state.isLoading = false;
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

    // 게시판 댓글 수정
    [editBulletinCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [editBulletinCommentDB.fulfilled]: (state, { payload }) => {
      // commentId로 특정 댓글을 찾아서 content를 바꿈.
      const idx = state.commentList.findIndex(
        (comment) => comment.commentId === payload.commentId
      );
      state.commentList[idx].content = payload.content;
      state.isFetching = false;
    },
    [editBulletinCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 게시판 댓글 삭제
    [deleteBulletinCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [deleteBulletinCommentDB.fulfilled]: (state, action) => {
      const commentId = action.payload.commentId;
      // 전체 state.list에서 commentId가 포함 된 것을 뺴고, state.list를 반환함.
      const bulletinCommentList = state.commentList.filter(
        (comment) => comment.commentId !== commentId
      );
      state.commentList = bulletinCommentList;
      state.isFetching = false;
    },
    [deleteBulletinCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 게시글 댓글 좋아요 토글
    [bulletinCommentLikeDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [bulletinCommentLikeDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [bulletinCommentLikeDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 게시판 댓글 무한 스크롤
    [getInfinityScrollBulletinCommentDB.pending]: (state, acton) => {
      state.isFetching = true;
    },
    [getInfinityScrollBulletinCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.commentList = [...state.commentList, ...payload];
    },
    [getInfinityScrollBulletinCommentDB.rejected]: (state, acton) => {
      state.isFetching = false;
    },
  },
});

export const { bulletinLikeToggle, setIsBoardLoading } =
  bulletinBoardSlice.actions;

export default bulletinBoardSlice;
