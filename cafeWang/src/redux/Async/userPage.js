import { createAsyncThunk } from "@reduxjs/toolkit";

//api
import {
  getUserInfo,
  getUserWrittencafes,
  getUserWrittenBoards,
  getUserLikedcafes,
  getUserLikedBoards,
  follow,
  unFollow,
  followList,
  followingList,
} from "../../shared/api/userPageApi";

//user페이지 정보 불러오기
const getUserInfoDB = createAsyncThunk(
  "userpage/userinfo",
  async (data, thunkAPI) => {
    const response = await getUserInfo(data);
    return response.data.data;
  }
);

//유저가 작성한 카페 후기 정보 불러오기
const getUserWrittencafesDB = createAsyncThunk(
  "userpage/cafes/write",
  async (data, thunkAPI) => {
    const response = await getUserWrittencafes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 작성한 카페 후기 정보 무한스크롤
const getInfinityScrollWrittencafesDB = createAsyncThunk(
  "userPage/cafes/write/getInfinityScroll",
  async (data, thunkAPI) => {
    const response = await getUserWrittencafes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가작성한 게시물 정보 불러오기
const getUserWrittenBoardsDB = createAsyncThunk(
  "userpage/board/write",
  async (data, thunkAPI) => {
    const response = await getUserWrittenBoards(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 작성한 게시물 무한스크롤
const getInfinityScrollWrittenBoardsDB = createAsyncThunk(
  "userPage/board/write/getInfinityScroll",
  async (data, thunkAPI) => {
    const response = await getUserWrittenBoards(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 좋아요한 카페 후기 정보 불러오기
const getUserLikedcafesDB = createAsyncThunk(
  "userpage/cafes/like",
  async (data, thunkAPI) => {
    const response = await getUserLikedcafes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 좋아요한 카페 후기 정보 무한스크롤
const getInfinityScrollLikedcafesDB = createAsyncThunk(
  "userpage/cafes/like/getInfinityScroll",
  async (data, thunkAPI) => {
    const response = await getUserLikedcafes(data.page, data.nickname);

    return response.data.data.content;
  }
);

//유저가 좋아요한 게시물 정보 불러오기
const getUserLikedBoardsDB = createAsyncThunk(
  "userpage/board/like",
  async (data, thunkAPI) => {
    const response = await getUserLikedBoards(data.page, data.nickname);
    return response.data.data.content;
  }
);

//유저가 좋아요한 게시물 정보 무한스크롤
const getInfinityScrollLikeBoardsDB = createAsyncThunk(
  "userpage/board/like/getInfinityScroll",
  async (data, thunkAPI) => {
    const response = await getUserLikedBoards(data.page, data.nickname);
    return response.data.data.content;
  }
);

//유저 팔로우 하기
const userFollowDB = createAsyncThunk(
  "userpage/follow",
  async (nickname, thunkAPI) => {
    const response = await follow(nickname);

    return nickname;
  }
);

//유저 팔로우 취소
const userUnFollowDB = createAsyncThunk(
  "userpage/unfollow",
  async (nickname, thunkAPI) => {
    const response = await unFollow(nickname);

    return nickname;
  }
);

//유저 팔로우 목록
const userFollowListDB = createAsyncThunk(
  "userpage/followList",
  async (data, thunkAPI) => {
    const response = await followList(data);

    return response.data.data.content;
  }
);

//유저 팔로잉 목록
const userFollowingListDB = createAsyncThunk(
  "userpage/followingList",
  async (data, thunkAPI) => {
    const response = await followingList(data);

    return response.data.data.content;
  }
);

export {
  getUserInfoDB,
  getUserWrittencafesDB,
  getInfinityScrollWrittencafesDB,
  getUserWrittenBoardsDB,
  getInfinityScrollWrittenBoardsDB,
  getUserLikedcafesDB,
  getInfinityScrollLikedcafesDB,
  getUserLikedBoardsDB,
  getInfinityScrollLikeBoardsDB,
  userFollowDB,
  userUnFollowDB,
  userFollowListDB,
  userFollowingListDB,
};
