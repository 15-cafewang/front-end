import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { cafeBoardApi } from "../../shared/api/cafeBoardApi";

// 레시피 작성
export const addCafePostDB = createAsyncThunk(
  "CafeBoard/addPost",
  async (data, { rejectWuthValue }) => {
    try {
      const response = await cafeBoardApi.addPost(data);

      return response.data.message;
    } catch (error) {
      return rejectWuthValue(error);
    }
  }
);

// 레시피 목록 가져오기
export const getCafePostListDB = createAsyncThunk(
  "cafeBoard/getPostList",
  async (data) => {
    const response = await cafeBoardApi.getPostList(data.page, data.sortBy);
    history.push("/cafeboard");
    console.log(response);
    return response.data.data.content;
  }
);

// 무한 스크롤 가져오기
export const getInfinityScrollDB = createAsyncThunk(
  "cafeBoard/getInfinityScroll",
  async (data) => {
    const response = await cafeBoardApi.getPostList(data.page, data.sortBy);
    return response.data.data.content;
  }
);

// 레시피 상세 조회
export const getCafePostDetailDB = createAsyncThunk(
  "cafeBoard/getPostDetail",
  async (data) => {
    const response = await cafeBoardApi.getPostDetail(data);
    return response.data.data;
  }
);

// 레시피 좋아요 토글
export const cafeLikeToggleDB = createAsyncThunk(
  "cafeBoard/likeToggle",
  async (data) => {
    const response = await cafeBoardApi.likeToggle(data);
    return response.data.data;
  }
);

// 레시피 수정
export const editCafePostDB = createAsyncThunk(
  "cafeBoard/editPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await cafeBoardApi.editPost(data.boardId, data.formData);

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 레시피 삭제
export const deleteCafePostDB = createAsyncThunk(
  "cafeBoard/deletePost",
  async (data) => {
    const response = await cafeBoardApi.deletePost(data);
    history.push("/cafeBoard");
    return response.data.data;
  }
);

// 댓글 추가
export const addCafeCommentDB = createAsyncThunk(
  "cafeBoard/addComment",
  async (data) => {
    const response = await cafeBoardApi.addComment(data);
    return response.data.data;
  }
);

//댓글 조회
export const getCafeCommentDB = createAsyncThunk(
  "cafeBoard/getComment",
  async (data) => {
    const response = await cafeBoardApi.getComment(data.cafeId, data.page);
    return response.data.data.content;
  }
);

// 댓글 수정
export const editCafeCommentDB = createAsyncThunk(
  "cafeBoard/editComment",
  async (data) => {
    const response = await cafeBoardApi.editComment(
      data.commentId,
      data.content
    );
    return response.data.data;
  }
);

// 댓글 삭제
export const deleteCafeCommentDB = createAsyncThunk(
  "cafeBoard/deleteComment",
  async (commentId) => {
    const response = await cafeBoardApi.deleteComment(commentId);
    const data = {
      commentId: commentId,
      message: response.data.message,
    };
    return data;
  }
);

// 댓글 좋아요
export const cafeCommentLikeDB = createAsyncThunk(
  "cafeBoardComment/likeToggle",
  async (data) => {
    const response = await cafeBoardApi.commentLikeToggle(data);
    return response.data.data;
  }
);

// 댓글 무한 스크롤
export const getInfinityScrollCafeCommentDB = createAsyncThunk(
  "cafeBoardComment/getInfinityScroll",
  async (data) => {
    const response = await cafeBoardApi.getComment(data.cafeId, data.page);
    return response.data.data.content;
  }
);
