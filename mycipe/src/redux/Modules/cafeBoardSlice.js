import { createSlice } from "@reduxjs/toolkit";

import {
  addCafePostDB,
  getCafePostListDB,
  getInfinityScrollDB,
  getCafePostDetailDB,
  cafeLikeToggleDB,
  editCafePostDB,
  deleteCafePostDB,
  addCafeCommentDB,
  getCafeCommentDB,
  editCafeCommentDB,
  deleteCafeCommentDB,
  cafeCommentLikeDB,
  getInfinityScrollCafeCommentDB,
} from "../Async/cafeBoard";

// initialstate
const initialstate = {
  isFetching: false,
  cafeList: [],
  currentcafePost: null,
  commentList: [],
};

const cafeBoardSlice = createSlice({
  name: "cafeBoard",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    // 레시피 목록 불러오기
    [getCafePostListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getCafePostListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.cafeList = payload;
    },
    [getCafePostListDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 무한스크롤
    [getInfinityScrollDB.pending]: (state, acton) => {
      state.isFetching = true;
    },
    [getInfinityScrollDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.cafeList = [...state.cafeList, ...payload];
    },
    [getInfinityScrollDB.rejected]: (state, acton) => {
      state.isFetching = false;
    },
    // 레시피 작성
    [addCafePostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addCafePostDB.fulfilled]: (state, action) => {
      state.isfetching = false;
    },
    [addCafePostDB.rejected]: (state, action) => {
      state.isfetching = false;
    },
    // 레시피 상세 조회
    [getCafePostDetailDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getCafePostDetailDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.currentcafePost = payload;
    },
    // 레시피  수정
    [editCafePostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [editCafePostDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [editCafePostDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    [getCafePostDetailDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 레시피 좋아요 토글
    [cafeLikeToggleDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [cafeLikeToggleDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [cafeLikeToggleDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 레시피 삭제
    [deleteCafePostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [deleteCafePostDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [deleteCafePostDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 레시피 댓글 추가
    [addCafeCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addCafeCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commentList.unshift(payload);
    },
    [addCafeCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 레시피 댓글 조회
    [getCafeCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getCafeCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commentList = payload;
    },
    [getCafeCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 레시피 댓글수정
    [editCafeCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [editCafeCommentDB.fulfilled]: (state, { payload }) => {
      // commentId로 특정 댓글을 찾아서 content를 바꿈.
      const idx = state.commentList.findIndex(
        (comment) => comment.commentId === payload.commentId
      );
      state.commentList[idx].content = payload.content;
      state.isFetching = false;
    },
    [editCafeCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 레시피 댓글 삭제
    [deleteCafeCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [deleteCafeCommentDB.fulfilled]: (state, action) => {
      const commentId = action.payload.commentId;
      // 전체 state.list에서 commentId가 포함 된 것을 뺴고, state.list를 반환함.
      const cafeCommentList = state.commentList.filter(
        (comment) => comment.commentId !== commentId
      );
      state.commentList = cafeCommentList;
      state.isFetching = false;
    },
    [deleteCafeCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 레시피 댓글 좋아요
    [cafeCommentLikeDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [cafeCommentLikeDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [cafeCommentLikeDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 댓글 무한스크롤
    [getInfinityScrollCafeCommentDB.pending]: (state, acton) => {
      state.isFetching = true;
    },
    [getInfinityScrollCafeCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commentList = [...state.commentList, ...payload];
    },
    [getInfinityScrollCafeCommentDB.rejected]: (state, acton) => {
      state.isFetching = false;
    },
  },
});

export default cafeBoardSlice;
