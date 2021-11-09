import { createAsyncThunk } from "@reduxjs/toolkit";

//api
import {
  getUserInfo,
  getUserWrittenRecipes,
  getUserWrittenBoardes,
  getUserLikeRecipes,
  getUserLikeBoards,
} from "../../shared/api/userPageApi";

//user페이지 정보 불러오기
const getUserInfoDB = createAsyncThunk(
  "userpage/userinfo",
  async (data, thunkAPI) => {
    const response = await getUserInfo(data);

    return response.data.data;
  }
);

//유저가 작성한 레시피 정보 불러오기
const getUserWrittenRecipesDB = createAsyncThunk(
  "userpage/recipes/write",
  async (data, thunkAPI) => {
    const response = await getUserWrittenRecipes(data);

    return response.data.data.content;
  }
);

//유저가작성한 게시물 정보 불러오기
const getUserWrittenBoardsDB = createAsyncThunk(
  "userpage/board/write",
  async (data, thunkAPI) => {
    const response = await getUserWrittenBoardes(data);

    return response.data.data.content;
  }
);

//유저가 좋아요한 레시피 정보 불러오기
const getUserLikedRecipesDB = createAsyncThunk(
  "userpage/recipes/like",
  async (data, thunkAPI) => {
    const response = await getUserLikeRecipes(data);

    return response.data.data.content;
  }
);

//유저가 좋아요한 게시물 정보 불러오기
const getUserLikedBoardsDB = createAsyncThunk(
  "userpage/board/like",
  async (data, thunkAPI) => {
    const response = await getUserLikeBoards(data);

    return response.data.data.content;
  }
);

export {
  getUserInfoDB,
  getUserWrittenRecipesDB,
  getUserWrittenBoardsDB,
  getUserLikedRecipesDB,
  getUserLikedBoardsDB,
};
