import { createSlice } from "@reduxjs/toolkit";
import { getSearchRecipeDB, getSearchBoardDB } from "../Async/Search";

//initialState

const initialState = {
  isFetching: false,

  whereFrom: "",
  isList: false,
  hashTag: "",
  keyword: "",
  currentSorting: "byDate",

  recipeList: [
    {
      recipeId: 24,
      nickname: "hhh",
      title: "hello111",
      content: "안녕하세요 헬로입.",
      images: [""],
      regDate: "2021-11-11T16:55:23.198059",
      commentCount: 0,
      likeCount: 0,
      price: null,
      likeStatus: false,
    },
  ],

  boardList: [
    {
      boardId: 2,
      nickname: "na_0",
      title: "제",
      content: "테스트내용",
      images: [""],
      regDate: "2021-11-07T02:21:46.212107",
      commentCount: 0,
      likeCount: 0,
      likeStatus: false,
    },
  ],
};

const searchSlice = createSlice({
  name: "Search",
  initialState: initialState,

  //동기
  reducers: {
    whereFrom: (state, action) => {
      state.whereFrom = action.payload;
    },

    resetList: (state, action) => {
      state.boardList = [];
      state.recipeList = [];
      state.isList = false;
    },

    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },

    setHashTag: (state, action) => {
      state.hashTag = action.payload;
    },

    setSorting: (state, action) => {
      state.currentSorting = action.payload;
    },
  },

  //비동기
  extraReducers: {
    //레시피검색
    [getSearchRecipeDB.pending]: (state, ation) => {
      state.isFetching = true;
    },

    [getSearchRecipeDB.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isList = true;
      state.recipeList = payload;
      state.boardList = [];
    },

    [getSearchRecipeDB.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.error);
    },

    //게시판검색
    [getSearchBoardDB.pending]: (state, ation) => {
      state.isFetching = true;
    },

    [getSearchBoardDB.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.hashTag = "";
      state.isList = true;
      state.boardList = payload;
      state.recipeList = [];
    },

    [getSearchBoardDB.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.error);
    },
  },
});

export const { whereFrom, resetList, setKeyword, setHashTag, setSorting } =
  searchSlice.actions;

export default searchSlice;
