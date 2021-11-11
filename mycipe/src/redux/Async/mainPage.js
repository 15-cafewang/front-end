import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainApi } from "../../shared/api/mainApi";

//인기 레시피 조회
export const getPopularDayListDB = createAsyncThunk(
  "mainPage/populartList",
  async (thunkAPI) => {
    const response = await mainApi.getPopularListDay();
    return response.data.data;
  }
);
export const getPopularWeekListDB = createAsyncThunk(
  "mainPage/populartList",
  async (thunkAPI) => {
    const response = await mainApi.getPopularListWeek();
    return response.data.data;
  }
);
export const getPopularMonthListDB = createAsyncThunk(
  "mainPage/populartList",
  async (thunkAPI) => {
    const response = await mainApi.getPopularListMonth();
    return response.data.data;
  }
);

// 최신 레시피 조회
export const getRecentListDB = createAsyncThunk(
  "mainPage/recentList",
  async (thunkAPI) => {
    const response = await mainApi.getRecentList();
    return response.data.data;
  }
);
