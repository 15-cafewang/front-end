import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { bulletinBoardApi } from "../../shared/api/bulletinBoardApi";

// export const getListDB = createAsyncThunk("recipeBoard/getList",
//   async (thunkAPI) => {
//     const response = await getList();

//   })

export const addBulletinPostDB = createAsyncThunk(
  "bulletinBoard/addPost",
  async (data, thunkAPI) => {
    const response = await bulletinBoardApi.addPost(data);
    window.alert(response.data.message);
    history.push("/bulletinboard");
    return response.data.message;
  }
);

export const getBulletinBoardListDB = createAsyncThunk(
  "bulletinBoard/getPostList",
  async (thunkAPI) => {
    const response = await bulletinBoardApi.getList();
    window.alert(response.data.message);
    return response.data.content;
  }
);
