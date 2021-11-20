import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { recipeBoardApi } from "../../shared/api/recipeBoardApi";

// 레시피 작성
export const addRecipePostDB = createAsyncThunk(
  "recipeBoard/addPost",
  async (data, thunkAPI) => {
    const response = await recipeBoardApi.addPost(data);
    history.push("/recipeboard");
    return response.data.message;
  }
);

// 레시피 목록 가져오기
export const getRecipePostListDB = createAsyncThunk(
  "recipeBoard/getPostList",
  async (data, thunkAPI) => {
    const response = await recipeBoardApi.getPostList(data.page, data.sortBy);
    history.push("/recipeboard");
    return response.data.data.content;
  }
);

// 무한 스크롤 가져오기
export const getInfinityScrollDB = createAsyncThunk(
  "recipeBoard/getInfinityScroll",
  async (data) => {
    const response = await recipeBoardApi.getPostList(data.page, data.sortBy);
    return response.data.data.content;
  }
);

// 레시피 상세 조회
export const getRecipePostDetailDB = createAsyncThunk(
  "recipeBoard/getPostDetail",
  async (data) => {
    const response = await recipeBoardApi.getPostDetail(data);
    return response.data.data;
  }
);

// 레시피 좋아요 토글
export const recipeLikeToggleDB = createAsyncThunk(
  "recipeBoard/likeToggle",
  async (data) => {
    const response = await recipeBoardApi.likeToggle(data);
    return response.data.data;
  }
);

// 레시피 수정
export const editRecipePostDB = createAsyncThunk(
  "recipeBoard/editPost",
  async (data) => {
    console.log(data);
    const response = await recipeBoardApi.editPost(data.boardId, data.formData);
    history.push("/recipeBoard");
    return response.data.data;
  }
);

// 레시피 삭제
export const deleteRecipePostDB = createAsyncThunk(
  "recipeBoard/deletePost",
  async (data) => {
    const response = await recipeBoardApi.deletePost(data);
    history.push("/recipeBoard");
    return response.data.data;
  }
);

// 댓글 추가
export const addRecipeCommentDB = createAsyncThunk(
  "recipeBoard/addComment",
  async (data) => {
    const response = await recipeBoardApi.addComment(data);
    return response.data.data;
  }
);

//댓글 조회
export const getRecipeCommentDB = createAsyncThunk(
  "recipeBoard/getComment",
  async (data) => {
    const response = await recipeBoardApi.getComment(data);
    return response.data.data.content;
  }
);
