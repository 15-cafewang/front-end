import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";

import {
  signupAPI,
  loginAPI,
  KakaoAPI,
  loginCheckAPI,
  emailCheckAPI,
  nicknameCheckAPI,
  updateUserInfoAPI,
} from "../../shared/api/userApi";

// 회원가입
export const signupDB = createAsyncThunk("user/signUp", async (data) => {
  console.log(data);
  const response = await signupAPI(data);
  history.push("/login");
  return response;
});

// 로그인
export const loginDB = createAsyncThunk("user/logIn", async (data) => {
  const response = await loginAPI(data);
  const USER_TOKEN = response.data.data.token;
  window.localStorage.setItem("USER_TOKEN", USER_TOKEN);
  const userInfo = {
    nickname: response.data.data.nickname,
    profileImage: response.data.data.image,
  };
  history.replace("/main");
  return userInfo;
});

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

// 로그인 체크
export const loginCheck = createAsyncThunk("user/loginCheck", async () => {
  const response = await loginCheckAPI();
  const userInfo = {
    nickname: response.data.data.nickname,
    profileImage: response.data.data.image,
  };
  return userInfo;
});

// 이메일 중복체크
export const emailCheckDB = createAsyncThunk(
  "user/emailCheck",
  async (email) => {
    const response = await emailCheckAPI(email);
    if (response.data.code === 1) {
      return true;
    } else {
      return false;
    }
  }
);

// 닉네임 중복체크
export const nickCheckDB = createAsyncThunk(
  "user/nickCheck",
  async (nickname) => {
    const response = await nicknameCheckAPI(nickname);
    if (response.data.code === 1) {
      return true;
    } else {
      return false;
    }
  }
);

// 회원정보 수정 ( 프로필이미지 + 닉네임)
export const updateUserInfoDB = createAsyncThunk(
  "user/updateUserInfoWithImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateUserInfoAPI(formData);

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);
