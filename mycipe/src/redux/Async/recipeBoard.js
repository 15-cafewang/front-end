import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { recipeBoardApi } from "../../shared/api/recipeBoardApi";

// export const getListDB = createAsyncThunk("recipeBoard/getList",
//   async (thunkAPI) => {
//     const response = await getList();

//   })

export const addRecipePostDB = createAsyncThunk(
  "recipeBoard/addPost",
  async (data, thunkAPI) => {
    console.log(data);
    const response = await recipeBoardApi.addPost(data);
    console.log(response);
    window.alert(response.data.message);
    history.push("/recipeboard");
    return response.data.message;
  }
);
