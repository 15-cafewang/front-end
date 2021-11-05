import { createSlice } from "@reduxjs/toolkit";
import { signupDB, kakaoLogin } from "../Async/user";

// inititalState
const initialState = {
  isLogin: false,
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  //리덕스
  reducer: {
    userReducer: (state, { payload }) => {
      state.isLogin = payload;
    },
  },
  extraReducers: {
    // 회원가입 성공시
    [signupDB.fulfilled]: (state, { payload }) => {
      window.alert("회원가입이 완료 되었습니다!");
    },
    // 회원가입 실패시
    [signupDB.rejected]: (state, action) => {
      window.alert("회원가입에 실패 하였습니다");
    },
  },
});

export const { userReducer } = userSlice.actions;

export default userSlice;
