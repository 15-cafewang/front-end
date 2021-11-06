import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { signupAPI, loginAPI } from "../../shared/api/userApi";

// 회원가입
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

// 로그인
export const loginDB = createAsyncThunk(
  "user/logIn",
  async (data, thunkAPI) => {
    try {
      const response = await loginAPI(data);
      if (response) {
        console.log(response);
        console.log(response.data);
        console.log(response.data.data.token);
        console.log("제발되라");
        const USER_TOKEN = response.data.data.token;
        window.localStorage.setItem("USER_TOKEN", USER_TOKEN);
        history.push("/main");
        return response;
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// 카카오 로그인
// export const kakaologin = createAsyncThunk("/user/kakao/callback", async code => {
//   try {
//     const response = await

//   }
// }

// )
