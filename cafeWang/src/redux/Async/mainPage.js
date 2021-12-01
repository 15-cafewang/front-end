import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRecommendCafe,
  getPopularListWeek,
  getPopularListMonth,
  getRecentList,
} from "../../shared/api/mainApi";

export const getRecommendCafeDB = createAsyncThunk(
  "mainPage/commendCafe",
  async (thunkAPI) => {
    const response = await getRecommendCafe();
    return response.data.data;
  }
);

//인기 카페 후기 조회
export const getPopularWeekListDB = createAsyncThunk(
  "mainPage/populartList",
  async (thunkAPI) => {
    const response = await getPopularListWeek();
    return response.data.data;
  }
);
export const getPopularMonthListDB = createAsyncThunk(
  "mainPage/populartList",
  async (thunkAPI) => {
    const response = await getPopularListMonth();
    return response.data.data;
  }
);

// 최신 카페 후기 조회
export const getRecentListDB = createAsyncThunk(
  "mainPage/recentList",
  async (thunkAPI) => {
    const response = await getRecentList();
    return response.data.data;
  }
);
