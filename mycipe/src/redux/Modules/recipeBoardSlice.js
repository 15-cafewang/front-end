import { createSlice } from "@reduxjs/toolkit";

import {
  addRecipePostDB,
  getRecipePostListDB,
  getInfinityScrollDB,
  getRecipePostDetailDB,
  recipeLikeToggleDB,
  editRecipePostDB,
  deleteRecipePostDB,
  addRecipeCommentDB,
  getRecipeCommentDB,
} from "../Async/recipeBoard";

// initialstate
const initialstate = {
  isFetching: false,
  recipeList: [],
  currentRecipePost: null,
};

const recipeBoardSlice = createSlice({
  name: "recipeBoard",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    // 레시피 목록 불러오기
    [getRecipePostListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getRecipePostListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.recipeList = payload;
    },
    [getRecipePostListDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 무한스크롤
    [getInfinityScrollDB.pending]: (state, acton) => {
      state.isFetching = true;
    },
    [getInfinityScrollDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;

      state.recipeList = [...state.recipeList, ...payload];
    },
    [getInfinityScrollDB.rejected]: (state, acton) => {
      state.isFetching = false;
    },
    // 레시피 작성
    [addRecipePostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addRecipePostDB.fulfilled]: (state, action) => {
      state.isfetching = false;
    },
    [addRecipePostDB.rejected]: (state, action) => {
      state.isfetching = false;
    },
    // 레시피 상세 조회
    [getRecipePostDetailDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getRecipePostDetailDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.currentRecipePost = payload;
    },
    [getRecipePostDetailDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 레시피 좋아요 토글
    [recipeLikeToggleDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [recipeLikeToggleDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [recipeLikeToggleDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 레시피 수정
    [editRecipePostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [editRecipePostDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [editRecipePostDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 레시피 삭제
    [deleteRecipePostDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [deleteRecipePostDB.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [deleteRecipePostDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 레시피 댓글 추가
    [addRecipeCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addRecipeCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commentList = payload;
      window.alert("댓글 작성 성공!");
    },
    [addRecipeCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 레시피 댓글 조회
    [getRecipeCommentDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getRecipeCommentDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commentList = payload;
    },
    [getRecipeCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export default recipeBoardSlice;
