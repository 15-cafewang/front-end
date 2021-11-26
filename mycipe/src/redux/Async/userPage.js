import { createAsyncThunk } from "@reduxjs/toolkit";

//api
import {
  getUserInfo,
  getUserWrittenRecipes,
  getUserWrittenBoards,
  getUserLikedRecipes,
  getUserLikedBoards,
  follow,
  unFollow,
  followList,
  followingList,
} from "../../shared/api/userPageApi";

import { updateUserList } from "../Modules/userPageSlice";

//user페이지 정보 불러오기
const getUserInfoDB = createAsyncThunk(
  "userpage/userinfo",
  async (data, thunkAPI) => {
    const response = await getUserInfo(data);
    console.log(response.data.data);
    return response.data.data;
  }
);

//유저가 작성한 레시피 정보 불러오기
const getUserWrittenRecipesDB = createAsyncThunk(
  "userpage/recipes/write",
  async (data, thunkAPI) => {
    const response = await getUserWrittenRecipes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 작성한 레시피 정보 무한스크롤
const getInfinityScrollWrittenRecipesDB = createAsyncThunk(
  "userPage/recipes/write/getInfinityScroll",
  async (data, thunkAPI) => {
    const response = await getUserWrittenRecipes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가작성한 게시물 정보 불러오기
const getUserWrittenBoardsDB = createAsyncThunk(
  "userpage/board/write",
  async (data, thunkAPI) => {
    const response = await getUserWrittenBoards(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 작성한 게시물 무한스크롤
const getInfinityScrollWrittenBoardsDB = createAsyncThunk(
  "userPage/board/write/getInfinityScroll",
  async (data, thunkAPI) => {
    const response = await getUserWrittenBoards(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 좋아요한 레시피 정보 불러오기
const getUserLikedRecipesDB = createAsyncThunk(
  "userpage/recipes/like",
  async (data, thunkAPI) => {
    const response = await getUserLikedRecipes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 좋아요한 레시피 정보 무한스크롤
const getInfinityScrollLikedRecipesDB = createAsyncThunk(
  "userpage/recipes/like/getInfinityScroll",
  async (data, thunkAPI) => {
    const response = await getUserLikedRecipes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 좋아요한 게시물 정보 불러오기
const getUserLikedBoardsDB = createAsyncThunk(
  "userpage/board/like",
  async (data, thunkAPI) => {
    const response = await getUserLikedBoards(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 좋아요한 게시물 정보 무한스크롤
const getInfinityScrollLikeBoardsDB = createAsyncThunk(
  "userpage/board/like",
  async (data, thunkAPI) => {
    const response = await getUserLikedBoards(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저 팔로우 하기
const userFollowDB = createAsyncThunk(
  "userpage/follow",
  async (userInfo, thunkAPI) => {
    const response = await follow(userInfo.nickname);

    const data = {
      userInfo: userInfo,
      message: response.data.message,
    };

    return data;
  }
);

//유저 팔로우 취소
const userUnFollowDB = createAsyncThunk(
  "userpage/unfollow",
  async (nickname, thunkAPI) => {
    const response = await unFollow(nickname);

    const data = {
      nickname: nickname,
      message: response.data.messgae,
    };

    return data;
  }
);

//유저 팔로우 목록
const userFollowListDB = createAsyncThunk(
  "userpage/followList",
  async (data, thunkAPI) => {
    const response = await followList(data);
    console.log(response.data.data.content);

    return response.data.data.content;
  }
);

//유저 팔로잉 목록
const userFollowingListDB = createAsyncThunk(
  "userpage/followingList",
  async (data, thunkAPI) => {
    const response = await followingList(data);
    console.log(response.data.data.content);

    return response.data.data.content;
  }
);

export {
  getUserInfoDB,
  getUserWrittenRecipesDB,
  getInfinityScrollWrittenRecipesDB,
  getUserWrittenBoardsDB,
  getInfinityScrollWrittenBoardsDB,
  getUserLikedRecipesDB,
  getInfinityScrollLikedRecipesDB,
  getUserLikedBoardsDB,
  getInfinityScrollLikeBoardsDB,
  userFollowDB,
  userUnFollowDB,
  userFollowListDB,
  userFollowingListDB,
};
