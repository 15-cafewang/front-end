import { createSlice } from "@reduxjs/toolkit";

import {
  addRecipePostDB,
  getRecipePostListDB,
  getRecipePostDetailDB,
} from "../Async/recipeBoard";

// initialstate
const initialstate = {
  isFetching: false,
  recipeList: [],
  currentRecipePost: {},
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
    // 레시피 작성
    [addRecipePostDB.pending]: (state, action) => {
      state.isfrecipeng = true;
    },
    [addRecipePostDB.fulfilled]: (state, action) => {
      state.isfetching = false;
    },
    [addRecipePostDB.rejected]: (state, action) => {
      state.isfetching = true;
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
  },
});

export default recipeBoardSlice;
