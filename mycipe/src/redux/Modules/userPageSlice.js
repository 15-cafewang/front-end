import { createSlice } from "@reduxjs/toolkit";

import {
  getUserInfoDB,
  getUserWrittenRecipesDB,
  getUserWrittenBoardsDB,
  getUserLikedRecipesDB,
  getUserLikedBoardsDB,
} from "../Async/userPage";

// inititalState
const initialState = {
  isFetching: false,
  // 페이지 유저정보
  userInfo: {
    image: null,
    nickname: "test1",
    followCount: null,
    followingCount: null,
    followStatus: false,
  },

  // 게시물 목록
  postList: {
    userWrittenRecipes: [
      {
        recipeId: 8,
        title: "123",
        nickname: "tester2",
        price: 1,
        imageList: [],
        likecount: 0,
      },
    ],

    userWrittenBoards: [
      {
        boardId: 1,
        title: "123",
        content: "123",
        regDate: null,
        likeCount: 0,
        commentCount: 0,
        imageList: [],
      },
    ],

    userLikedBoards: [
      {
        boardId: 1,
        title: "123",
        content: "123",
        regDate: null,
        likeCount: 0,
        commentCount: 0,
        imageList: [],
      },
    ],

    userLikedRecipes: [
      {
        recipeId: 8,
        title: "123",
        nickname: "tester2",
        price: 1,
        imageList: [],
        likecount: 0,
      },
    ],
  },
};

const userPageSlice = createSlice({
  name: "userPage",

  initialState: initialState,
  //리덕스
  reducers: {
    // 저장된 게시물들 삭제 ()
    resetPost: (state, action) => {
      for (let item in state.postList) {
        state.postList[item] = [];
      }
    },
  },

  extraReducers: {
    // 유저페이지 정보 불러오기
    [getUserInfoDB.pending]: (state, ation) => {
      state.isFetching = true;
    },

    [getUserInfoDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.userInfo = payload;
    },

    [getUserInfoDB.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.error);
    },

    [getUserWrittenRecipesDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getUserWrittenRecipesDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userWrittenRecipes = action.payload;
    },
    [getUserWrittenRecipesDB.rejected]: (state, action) => {
      console.log(action.error);
    },

    // 유저가 작성한 게시물 불러오기
    [getUserWrittenBoardsDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getUserWrittenBoardsDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userWrittenBoards = action.payload;
    },
    [getUserWrittenBoardsDB.rejected]: (state, action) => {
      console.log(action.error);
    },

    //유저 좋아요 레시피
    [getUserLikedRecipesDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getUserLikedRecipesDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userLikedRecipes = action.payload;
    },
    [getUserLikedRecipesDB.rejected]: (state, action) => {
      console.log(action.error);
    },

    //유저 좋아요 게시물
    [getUserLikedBoardsDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getUserLikedBoardsDB.fulfilled]: (state, action) => {
      state.isFetching = false;

      state.postList.userLikedBoards = action.payload;
    },
    [getUserLikedBoardsDB.rejected]: (state, action) => {
      console.log(action.error);
    },
  },
});

export const { resetPost } = userPageSlice.actions;

export default userPageSlice;
