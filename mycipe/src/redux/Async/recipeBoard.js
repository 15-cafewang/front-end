import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { recipeBoardApi } from "../../shared/api/recipeBoardApi";

// 레시피 작성
export const addRecipePostDB = createAsyncThunk(
  "recipeBoard/addPost",
  async (data, thunkAPI) => {
    const response = await recipeBoardApi.addPost(data);
    // window.alert(response.data.message);
    history.push("/recipeboard");
    return response.data.message;
  }
);

// 레시피 목록 가져오기
export const getRecipePostListDB = createAsyncThunk(
  "recipeBoard/getPostList",
  async (data, thunkAPI) => {
    const response = await recipeBoardApi.getPostList(data);
    // window.alert(response.data.message);
    history.push("/recipeboard");
    return response.data.data.content;
  }
);

// 레시피 상세 조회
export const getRecipePostDetailDB = createAsyncThunk(
  "recipeBoard/getPostDetail",
  async (data) => {
    const response = await recipeBoardApi.getPostDetail(data);
    // window.alert(response.data.message);
    return response.data.data;
  }
);

// 레시피 좋아요 토글
export const recipeLikeToggleDB = createAsyncThunk(
  "recipeBoard/likeToggle",
  async (data) => {
    const response = await recipeBoardApi.likeToggle(data);
    // window.alert(response.data.message);
    return response.data.data;
  }
);

// 레시피 수정
export const editRecipePostDB = createAsyncThunk(
  "recipeBoard/editPost",
  async (data) => {
    console.log(data);
    const response = await recipeBoardApi.editPost(data.boardId, data.formData);
    window.alert(response.data.message);
    history.push("/recipeBoard");
    return response.data.data;
  }
);

// 레시피 삭제
export const deleteRecipePostDB = createAsyncThunk(
  "recipeBoard/deletePost",
  async (data) => {
    const response = await recipeBoardApi.deletePost(data);
    window.alert(response.data.message);
    history.push("/recipeBoard");
    return response.data.data;
  }
);
