import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchcafe, getSearchBoard } from "../../shared/api/searchApi";
import {
  setKeyword,
  setHashTag,
  addCafeKeyword,
  addBoardKeyword,
} from "../Modules/searchSlice";

//카페 후기 검색.
const getSearchCafeDB = createAsyncThunk(
  "search/cafe",
  async (searchInfo, ThunkAPI) => {
    const response = await getSearchcafe(searchInfo);

    if (!searchInfo.withTag) {
      //검색어로 검색했을떄.
      //현재 검색한 검색어.
      ThunkAPI.dispatch(setKeyword(searchInfo.keyword));

      //리덕스에 저장된 해쉬태그 초기화.(검색어로 검색했기떄문에 불필요하기떄문)
      ThunkAPI.dispatch(setHashTag(null));

      // 최근검색어에 추가.
      ThunkAPI.dispatch(addCafeKeyword(searchInfo.keyword));
    } else {
      // 해쉬태그로 검색했을떄.
      ThunkAPI.dispatch(setHashTag(searchInfo.keyword));
    }

    return response.data.data.content;
  }
);

//게시판 검색.
const getSearchBoardDB = createAsyncThunk(
  "search/board",
  async (searchInfo, ThunkAPI) => {
    const response = await getSearchBoard(searchInfo);

    ThunkAPI.dispatch(setKeyword(searchInfo.keyword));
    ThunkAPI.dispatch(addBoardKeyword(searchInfo.keyword));

    return response.data.data.content;
  }
);

export { getSearchCafeDB, getSearchBoardDB };
