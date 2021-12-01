import api from "./index";

// 추천 카페
const getRecommendCafe = () => {
  return api.get("/main/recommend");
};
//메인 인기카페 후기 조회
const getPopularListWeek = () => {
  return api.get("/main/popular?sortBy=week");
};
const getPopularListMonth = () => {
  return api.get("/main/popular?sortBy=month");
};

//최신 카페 후기 조회
const getRecentList = () => {
  return api.get("/main/recent");
};

//현랭킹 정보 불러오기
const getRankListDB = () => {
  return api.get("/main/thisweek");
};

//지난주 왕 불러오기
const getKingListDB = () => {
  return api.get("/main/lastweek");
};

export {
  getRecommendCafe,
  getPopularListWeek,
  getPopularListMonth,
  getRecentList,
  getRankListDB,
  getKingListDB,
};
