import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchRecipe, getSearchBoard } from "../../shared/api/searchApi";
import { setKeyword, setHashTag } from "../Modules/searchSlice";

//레시피 검색.
const getSearchRecipeDB = createAsyncThunk(
  "search/recipe",
  async (searchInfo, ThunkAPI) => {
    const response = await getSearchRecipe(searchInfo);
    console.log(searchInfo);
    if (!searchInfo.withTag) {
      ThunkAPI.dispatch(setKeyword(searchInfo.keyword));
      ThunkAPI.dispatch(setHashTag(null));
    } else {
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
    console.log(searchInfo);
    ThunkAPI.dispatch(setKeyword(searchInfo.keyword));

    return response.data.data.content;
  }
);

export { getSearchRecipeDB, getSearchBoardDB };
