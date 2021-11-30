import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  //검색페이지로 이동할떄 어떤 게시판으로부터 왔는지 ( 카페후기 or 자유게시판)
  whereFrom: "",
};

const whereFromSlice = createSlice({
  name: "whereFrom",
  initialState: initialState,

  //동기
  reducers: {
    whereFrom: (state, action) => {
      state.whereFrom = action.payload;
    },
  },
});

export const { whereFrom } = whereFromSlice.actions;

export default whereFromSlice;
