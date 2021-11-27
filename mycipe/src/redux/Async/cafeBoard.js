import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import {
  getPostList,
  addPost,
  editPost,
  deletePost,
  getPostDetail,
  getComment,
  addComment,
  editComment,
  deleteComment,
  likeToggle,
  commentLikeToggle,
} from "../../shared/api/cafeBoardApi";

// 카페 후기 작성
export const addCafePostDB = createAsyncThunk(
  "CafeBoard/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addPost(data);

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 카페 후기 목록 가져오기
export const getCafePostListDB = createAsyncThunk(
  "cafeBoard/getPostList",
  async (data) => {
    const response = await getPostList(data.page, data.sortBy);
    history.push("/cafeboard");
    return response.data.data.content;
  }
);

// 무한 스크롤 가져오기
export const getInfinityScrollDB = createAsyncThunk(
  "cafeBoard/getInfinityScroll",
  async (data) => {
    const response = await getPostList(data.page, data.sortBy);
    return response.data.data.content;
  }
);

// 카페 후기 상세 조회
export const getCafePostDetailDB = createAsyncThunk(
  "cafeBoard/getPostDetail",
  async (data) => {
    const response = await getPostDetail(data);
    return response.data.data;
  }
);

// 카페 후기 좋아요 토글
export const cafeLikeToggleDB = createAsyncThunk(
  "cafeBoard/likeToggle",
  async (data) => {
    const response = await likeToggle(data);
    return response.data.data;
  }
);

// 카페 후기 수정
export const editCafePostDB = createAsyncThunk(
  "cafeBoard/editPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await editPost(data.boardId, data.formData);

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 카페 후기 삭제
export const deleteCafePostDB = createAsyncThunk(
  "cafeBoard/deletePost",
  async (data) => {
    const response = await deletePost(data);
    history.push("/cafeBoard");
    return response.data.data;
  }
);

// 댓글 추가
export const addCafeCommentDB = createAsyncThunk(
  "cafeBoard/addComment",
  async (data) => {
    const response = await addComment(data);
    return response.data.data;
  }
);

//댓글 조회
export const getCafeCommentDB = createAsyncThunk(
  "cafeBoard/getComment",
  async (data) => {
    const response = await getComment(data.cafeId, data.page);
    return response.data.data.content;
  }
);

// 댓글 수정
export const editCafeCommentDB = createAsyncThunk(
  "cafeBoard/editComment",
  async (data) => {
    const response = await editComment(data.commentId, data.content);
    return response.data.data;
  }
);

// 댓글 삭제
export const deleteCafeCommentDB = createAsyncThunk(
  "cafeBoard/deleteComment",
  async (commentId) => {
    const response = await deleteComment(commentId);
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
    const response = await commentLikeToggle(data);
    return response.data.data;
  }
);

// 댓글 무한 스크롤
export const getInfinityScrollCafeCommentDB = createAsyncThunk(
  "cafeBoardComment/getInfinityScroll",
  async (data) => {
    const response = await getComment(data.cafeId, data.page);
    return response.data.data.content;
  }
);
