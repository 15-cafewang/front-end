import api from "./index";

export const mainApi = {
  // 추천 카페
  getRecommendCafe: () => {
    return api.get("/main/recommend");
  },
  //메인 인기레시피 조회
  getPopularListWeek: () => {
    return api.get("/main/popular?sortBy=week");
  },
  getPopularListMonth: () => {
    return api.get("/main/popular?sortBy=month");
  },

  //최신 레시피 조회
  getRecentList: () => {
    return api.get("/main/recent");
  },
};
