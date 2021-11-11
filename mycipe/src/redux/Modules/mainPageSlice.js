import { createSlice } from "@reduxjs/toolkit";

import {
  getRecentListDB,
  getPopularDayListDB,
  getPopularWeekListDB,
  getPopularMonthListDB,
} from "../Async/mainPage";

// initialstate
const initialstate = {
  isFetching: false,
  recentList: [],
  popularList: [],
};

const mainPageSlice = createSlice({
  name: "mainPage",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    // 일간
    [getPopularDayListDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getPopularDayListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.popularList = payload;
    },
    [getPopularDayListDB.rejected]: (state, action) => {
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
