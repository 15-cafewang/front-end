import { createSlice } from "@reduxjs/toolkit";

import {
  getRecommendCafeDB,
  getRecentListDB,
  getPopularWeekListDB,
  getPopularMonthListDB,
} from "../Async/mainPage";

// initialstate
const initialstate = {
  isFetching: false,
  recentList: [],
  popularList: [],
  commendList: [],
};

const mainPageSlice = createSlice({
  name: "mainPage",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    //추천
    [getRecommendCafeDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getRecommendCafeDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.commendList = payload;
    },
    [getRecommendCafeDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 주간
    [getPopularWeekListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getPopularWeekListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.popularList = payload;
    },
    [getPopularWeekListDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    // 월간
    [getPopularMonthListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getPopularMonthListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.popularList = payload;
    },
    [getPopularMonthListDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
    //최신
    [getRecentListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getRecentListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.recentList = payload;
    },
    [getRecentListDB.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export default mainPageSlice;
