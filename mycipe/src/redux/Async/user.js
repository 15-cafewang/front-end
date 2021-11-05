import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { signupAPI } from "../../shared/api";

export const signupDB = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    try {
      const response = await signupAPI(data);
      if (response) {
        console.log(response);
        history.push("/login");
        return response.data;
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
