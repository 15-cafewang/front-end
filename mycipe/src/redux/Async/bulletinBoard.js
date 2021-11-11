import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { bulletinBoardApi } from "../../shared/api/bulletinBoardApi";

// 게시글 작성
export const addBulletinPostDB = createAsyncThunk(
  "bulletinBoard/addPost",
  async (data, thunkAPI) => {
    const response = await bulletinBoardApi.addPost(data);
    // window.alert(response.data.message);
    history.push("/bulletinboard");
    return response.data.message;
  }
);

// 게시판 목록 가져오기
export const getBulletinPostListDB = createAsyncThunk(
  "bulletinBoard/getPostList",
  async (data, thunkAPI) => {
    const response = await bulletinBoardApi.getList(data);
    // window.alert(response.data.message);
    return response.data.data.content;
  }
);

// 게시판 상세 조회
export const getBulletinPostDetailDB = createAsyncThunk(
  "bulletinBoard/getPostDetail",
  async (data, thunkAPI) => {
    const response = await bulletinBoardApi.getPostDetail(data);
    // window.alert(response.data.message);
    return response.data.data;
  }
);

// 게시글 좋아요 토글
export const bulletinLikeToggleDB = createAsyncThunk(
  "bulletinBoard/likeToggle",
  async (data) => {
    const response = await bulletinBoardApi.likeToggle(data);
    // window.alert(response.data.message);
    return response.data.data;
  }
);

// 게시글 수정
export const editBulletinPostDB = createAsyncThunk(
  "bulletinBoard/editPost",
  async (data) => {
    console.log(data);
    const response = await bulletinBoardApi.editPost(
      data.boardId,
      data.formData
    );
    window.alert(response.data.message);
    history.push("/bulletinBoard");
    return response.data.data;
  }
);

// 게시글 삭제
export const deleteBulletinPostDB = createAsyncThunk(
  "bulletinBoard/deletePost",
  async (data) => {
    const response = await bulletinBoardApi.deletePost(data);
    window.alert(response.data.message);
    history.push("/bulletinBoard");
    return response.data.data;
  }
);
