import { createSlice } from "@reduxjs/toolkit";
import { signupDB, loginDB, kakaoLogin, loginCheck } from "../Async/user";

// inititalState
const initialState = {
  isLogin: false,
  isFetching: false,
  userInfo: {
    nickname: "",
    profileImage: "image",
  },
};

const userSlice = createSlice({
  name: "user",
  isFetching: false,
  initialState: initialState,
  //리덕스
  reducers: {},
  extraReducers: {
    // 회원가입
    [signupDB.pending]: (state, ation) => {
      state.isFetching = true;
    },
    // 회원가입 성공시
    [signupDB.fulfilled]: (state, { payload }) => {
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
      state.userInfo = payload;
      state.isLogin = false;
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
      state.isFetching = false;
      state.isLogin = true;
      window.alert("로그인 되셨습니다! 환영합니다!");
    },
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
  },
});

export const { userReducer } = userSlice.actions;

export default userSlice;
