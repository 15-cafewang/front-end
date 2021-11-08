import { createSlice } from "@reduxjs/toolkit";
import { signupDB, loginDB, kakaoLogin } from "../Async/user";

// inititalState
const initialState = {
  isLogin: false,
  isFetching: false,
  userInfo: {
    nickname: null,
    profileImage: null,
  },
};

const userSlice = createSlice({
  name: "user",
  // isFetching: false,
  initialState: initialState,
  //리덕스
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("USER_TOKEN");
      state.isLogin = false;
      state.userInfo = {};
      window.alert("로그아웃이 완료되었습니다.");
    },
  },
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
      state.isLogin = true;
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
  },
});

export const { logout } = userSlice.actions;

export default userSlice;
