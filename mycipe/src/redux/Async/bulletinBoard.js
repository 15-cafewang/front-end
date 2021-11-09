import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { bulletinBoardApi } from "../../shared/api/bulletinBoardApi";

// export const getListDB = createAsyncThunk("recipeBoard/getList",
//   async (thunkAPI) => {
//     const response = await getList();

//   })

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
  async (thunkAPI) => {
    const response = await bulletinBoardApi.getList();
    // window.alert(response.data.message);
    return response.data.data.content;
  }
);

// 게시판 상세 조회
export const getBulletinPostDetailDB = createAsyncThunk(
  "recipeBoard/getPostDetail",
  async (data, thunkAPI) => {
    const response = await bulletinBoardApi.getPostDetail(data);
    // window.alert(response.data.message);
    return response.data.data;
  }
);
