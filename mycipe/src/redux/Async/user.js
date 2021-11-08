import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import { signupAPI, loginAPI, KakaoAPI } from "../../shared/api/userApi";

// 회원가입
export const signupDB = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    const response = await signupAPI(data);
    console.log(response);
    history.push("/login");
    return response.data;
  }
);

// 로그인
export const loginDB = createAsyncThunk(
  "user/logIn",
  async (data, thunkAPI) => {
    const response = await loginAPI(data);
    const USER_TOKEN = response.data.data.token;
    window.localStorage.setItem("USER_TOKEN", USER_TOKEN);
    const userInfo = {
      nickname: response.data.data.nickname,
      profileImage: response.data.data.image,
    };
    history.replace("/main");
    console.log(userInfo);
    return userInfo;
  }
);

//카카오 로그인
export const kakaoLogin = createAsyncThunk(
  "/user/kakao/callback",
  async (code) => {
    const response = await KakaoAPI(code);
    const USER_TOKEN = response.data.data.token;
    window.localStorage.setItem("USER_TOKEN", USER_TOKEN);
    const userInfo = {
      nickname: response.data.data.nickname,
      profileImage: response.data.data.image,
    };
    history.replace("/main");
    return userInfo;
  }
);
