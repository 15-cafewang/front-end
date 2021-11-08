import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoDB } from "../Async/userPage";

// inititalState
const initialState = {
  isFetching: false,
  userInfo: {
    image: null,
    nickname: "test1",
    followCount: null,
    followingCount: null,
    followStatus: false,
  },
};

const userPageSlice = createSlice({
  name: "userPage",
  initialState: initialState,
  //리덕스
  reducers: {},
  extraReducers: {
    // 유저페이지 정보 pending
    [getUserInfoDB.pending]: (state, ation) => {
      state.isFetching = true;
    },
    // 유저페이지 정보 성공시
    [getUserInfoDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.userInfo = payload;
    },
    // 유저페이지 정보 실패시
    [getUserInfoDB.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.error);
    },
  },
});
export default userPageSlice;
