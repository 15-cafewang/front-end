import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import {
  getList,
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
} from "../../shared/api/bulletinBoardApi";

// 게시글 작성
export const addBulletinPostDB = createAsyncThunk(
  "bulletinBoard/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addPost(data);

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 게시판 목록 가져오기
export const getBulletinPostListDB = createAsyncThunk(
  "bulletinBoard/getPostList",
  async (data) => {
    const response = await getList(data.page, data.sortBy);
    return response.data.data.content;
  }
);

// 무한 스크롤 가져오기
export const getInfinityScrollDB = createAsyncThunk(
  "bulletinBoard/getInfinityScroll",
  async (data) => {
    const response = await getList(data.page, data.sortBy);
    return response.data.data.content;
  }
);

// 게시판 상세 조회
export const getBulletinPostDetailDB = createAsyncThunk(
  "bulletinBoard/getPostDetail",
  async (data) => {
    const response = await getPostDetail(data);
    return response.data.data;
  }
);

// 게시글 좋아요 토글
export const bulletinLikeToggleDB = createAsyncThunk(
  "bulletinBoard/likeToggle",
  async (data) => {
    const response = await likeToggle(data);
    return response.data.data;
  }
);

// 게시글 수정
export const editBulletinPostDB = createAsyncThunk(
  "bulletinBoard/editPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await editPost(data.boardId, data.formData);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 게시글 삭제
export const deleteBulletinPostDB = createAsyncThunk(
  "bulletinBoard/deletePost",
  async (data) => {
    const response = await deletePost(data);
    history.push("/bulletinBoard");
    return response.data.data;
  }
);

// 댓글 추가
export const addBulletinCommentDB = createAsyncThunk(
  "bulletinBoard/addComment",
  async (data) => {
    const response = await addComment(data);
    return response.data.data;
  }
);

// 댓글 조회
export const getBulletinCommentDB = createAsyncThunk(
  "bulletinBoard/getComment",
  async (data) => {
    const response = await getComment(data.boardId, data.page);
    return response.data.data.content;
  }
);

// 댓글 수정
export const editBulletinCommentDB = createAsyncThunk(
  "bulletinBoard/editComment",
  async (data) => {
    const response = await editComment(data.commentId, data.content);
    return response.data.data;
  }
);

// 댓글 삭제
export const deleteBulletinCommentDB = createAsyncThunk(
  "bulletinBoard/deleteComment",
  async (commentId) => {
    const response = await deleteComment(commentId);
    const data = {
      commentId: commentId,
      message: response.data.message,
    };
    return data;
  }
);

// 게시글 댓글 좋아요
export const bulletinCommentLikeDB = createAsyncThunk(
  "bulletinBoardComment/likeToggle",
  async (data) => {
    const response = await commentLikeToggle(data);
    return response.data.data;
  }
);

// 게시판 댓글 무한 스크롤
export const getInfinityScrollBulletinCommentDB = createAsyncThunk(
  "cafeBoardComment/getInfinityScroll",
  async (data) => {
    const response = await getComment(data.boardId, data.page);
    return response.data.data.content;
  }
);
