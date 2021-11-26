import { createSlice } from "@reduxjs/toolkit";
import { getSearchCafeDB, getSearchBoardDB } from "../Async/Search";

//initialState
const initialState = {
  isFetching: false,

  //어떤 게시판으로부터 왔는지
  whereFrom: "",

  //현재 검색페이지에서 게시물 리스트가 존재하는지(레시피 or 자유게시판을 불러올떄 true로바꿔준다.)
  isList: false,

  // 해쉬태그
  hashTag: "",

  //검색어
  keyword: "",

  //최신순 or 인기순 버튼 활성화
  currentSorting: "byDate",

  //최근검색어
  cafeSearchList: [],
  boardSearchList: [],

  cafeList: [
    // {
    //   cafeId: 24,
    //   nickname: "hhh",
    //   title: "hello111",
    //   content: "안녕하세요 헬로입.",
    //   images: [""],
    //   regDate: "2021-11-11T16:55:23.198059",
    //   commentCount: 0,
    //   likeCount: 0,
    //   price: null,
    //   likeStatus: false,
    // },
  ],

  boardList: [
    // {
    //   boardId: 2,
    //   nickname: "na_0",
    //   title: "제",
    //   content: "테스트내용",
    //   images: [""],
    //   regDate: "2021-11-07T02:21:46.212107",
    //   commentCount: 0,
    //   likeCount: 0,
    //   likeStatus: false,
    // },
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

    //레시피 메인 or 자유게시판 메인에서 넘어올떄 저장된 게시물들 전부 초기화.
    resetList: (state, action) => {
      state.boardList = [];
      state.cafeList = [];
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

    //레시피 검색어 추가
    addCafeKeyword: (state, action) => {
      const newKeyword = action.payload;

      //새로 등록할 키워드가 이미존재한다면 확인후 삭제하고 추가.
      if (state.cafeSearchList.includes(newKeyword)) {
        const index = state.cafeSearchList.indexOf(newKeyword);
        state.cafeSearchList.splice(index, 1);
        state.cafeSearchList.unshift(newKeyword);
      } else {
        state.cafeSearchList.unshift(newKeyword);
      }
      //5개를 넘어가면 1개 제거.
      if (state.cafeSearchList.length === 6) {
        state.cafeSearchList.pop();
      }
    },
    // 레시피 검색어 전부삭제
    deleteAllCafeKeyword: (state, action) => {
      state.cafeSearchList = [];
    },

    //레시피 검색어 한개 삭제
    deleteCafeKeyword: (state, action) => {
      const index = state.cafeSearchList.indexOf(action.payload);
      state.cafeSearchList.splice(index, 1);
    },

    //자유게시판 검색어 추가
    addBoardKeyword: (state, action) => {
      const newKeyword = action.payload;

      //새로 등록할 키워드가 존재한다면 확인후 삭제하고 추가.(등록 순서 유지 떄문에)
      if (state.boardSearchList.includes(newKeyword)) {
        const index = state.boardSearchList.indexOf(newKeyword);
        state.boardSearchList.splice(index, 1);
        state.boardSearchList.unshift(newKeyword);
      } else {
        state.boardSearchList.unshift(newKeyword);
      }

      //5개를 넘어가면 1개 제거.
      if (state.boardSearchList.length === 6) {
        state.boardSearchList.pop();
      }
    },

    // 자유게시판 검색어 전부삭제
    deleteAllBoardKeyword: (state, action) => {
      state.boardSearchList = [];
    },

    //자유게시판 검색어 한개 삭제
    deleteBoardKeyword: (state, action) => {
      const index = state.boardSearchList.indexOf(action.payload);
      state.boardSearchList.splice(index, 1);
    },
  },

  //비동기
  extraReducers: {
    //레시피검색
    [getSearchCafeDB.pending]: (state, ation) => {
      state.isFetching = true;
    },

    [getSearchCafeDB.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;

      state.isList = true;
      state.cafeList = payload;

      //레시피를 보여줄 거기 때문에 자유게시판 목록은 필요가 없다.
      state.boardList = [];
    },

    [getSearchCafeDB.rejected]: (state, action) => {
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

      //자유게시판 목록을 보여줄 거기 때문에 레시피 목록은 필요가 없다.
      state.cafeList = [];
    },

    [getSearchBoardDB.rejected]: (state, action) => {
      state.isFetching = false;
      console.log(action.error);
    },
  },
});

export const {
  whereFrom,

  resetList,

  setKeyword,
  setHashTag,
  setSorting,

  addCafeKeyword,
  deleteAllCafeKeyword,
  deleteCafeKeyword,

  addBoardKeyword,
  deleteAllBoardKeyword,
  deleteBoardKeyword,
} = searchSlice.actions;

export default searchSlice;
