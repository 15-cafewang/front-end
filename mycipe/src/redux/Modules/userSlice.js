import { createSlice } from "@reduxjs/toolkit";
import {
  signupDB,
  loginDB,
  kakaoLogin,
  loginCheck,
  emailCheckDB,
  nickCheckDB,
  updateUserInfoDB,
} from "../Async/user";

// inititalState
const initialState = {
  isLogin: false,
  isFetching: false,
  emailConfirm: false,
  nickConfirm: false,
  userInfo: {
    nickname: null,
    profileImage: null,
  },
};

const userSlice = createSlice({
  name: "user",

  initialState: initialState,
  //리덕스
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("USER_TOKEN");
      state.isLogin = false;
      state.userInfo = {};
      window.alert("로그아웃이 완료되었습니다.");
    },

    updateUserInfo: (state, action) => {
      console.log(action.payload);

      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    // 회원가입
    [signupDB.pending]: (state, ation) => {
      state.isFetching = true;
    },
    // 회원가입 성공시
    [signupDB.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      window.alert("회원가입이 완료 되었습니다!");
    },
    // 회원가입 실패시
    [signupDB.rejected]: (state, action) => {
      state.isFetching = false;
      window.alert("회원가입에 실패 하였습니다");
    },
    // 로그인
    [loginDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    // 로그인 성공시
    [loginDB.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      state.isLogin = true;
      state.userInfo = payload;
      window.alert("로그인 되셨습니다! 환영합니다!");
    },
    // 로그인 실패시
    [loginDB.rejected]: (state, action) => {
      state.isFetching = false;
      window.alert("로그인 실패");
    },
    //카카오
    [kakaoLogin.pending]: (state, action) => {
      state.isFetching = true;
    },
    // 카카오 로그인 성공시
    [kakaoLogin.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isFetching = false;
      state.isLogin = true;
      window.alert("로그인 되셨습니다! 환영합니다!");
    },
    // 카카오 로그인 실패시
    [kakaoLogin.rejected]: (state, action) => {
      state.isFetching = false;
      window.alert("로그인 실패");
    },
    // 로그인체크
    [loginCheck.pending]: (state, action) => {
      state.isFetching = true;
    },
    // 로그인체크 성공시
    [loginCheck.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      state.isFetching = false;
      state.userInfo = payload;
    },
    // 로그인체크 실패시
    [loginCheck.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 이메일 인증체크
    [emailCheckDB.pending]: (state, action) => {
      state.isFetching = true;
      state.emailConfirm = false;
    },
    // 이메일 인증체크 성공
    [emailCheckDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.emailConfirm = payload;
    },
    // 이메일 인증체크 실패
    [emailCheckDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.emailConfirm = false;
    },
    // 닉네임 인증체크
    [nickCheckDB.pending]: (state, action) => {
      state.isFetching = true;
      state.nickConfirm = false;
    },
    // 닉네임 인증체크 성공
    [nickCheckDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.nickConfirm = payload;
    },
    // 닉네임 인증체크 실패
    [nickCheckDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.nickConfirm = false;
    },

    // 유저정보 변경
    [updateUserInfoDB.pending]: (state, action) => {
      state.isFetching = true;
    },

    // 유저정보 변경 성공
    [updateUserInfoDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
    },

    // 유저정보 변경 실패
    [updateUserInfoDB.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },
  },
});

export const { logout, updateUserInfo } = userSlice.actions;

export default userSlice;
