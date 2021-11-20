import api from "./index";

const getUserInfo = (nickname) => api.get(`/userinfo/${nickname}`);

const getUserWrittenRecipes = (page, nickname) =>
  api.get(
    `/userinfo/recipes/${nickname}?page=${page}&size=7&isAsc=false&sortBy=regDate`
  );

const getUserWrittenBoards = (page, nickname) =>
  api.get(
    `/userinfo/boards/${nickname}?page=${page}&size=7&isAsc=false&sortBy=regDate`
  );

const getUserLikedRecipes = (page, nickname) =>
  api.get(
    `/userinfo/recipes/likes/${nickname}?page=${page}&size=7&isAsc=false&sortBy=regDate`
  );

const getUserLikedBoards = (page, nickname) =>
  api.get(
    `/userinfo/boards/likes/${nickname}?page=${page}&size=7&isAsc=false&sortBy=regDate`
  );

const follow = (nickname) => api.post(`/follows/${nickname}`);

const unFollow = (nickname) => api.delete(`/follows/${nickname}`);

const followList = (nickname) =>
  api.get(
    `/userinfo/follows/follower/${nickname}?page=1&size=10&isAsc=false&sortBy=regDate`
  );

const followingList = (nickname) =>
  api.get(
    `/userinfo/follows/following/${nickname}?page=1&size=10&isAsc=false&sortBy=regDate`
  );

export {
  getUserInfo,
  getUserWrittenRecipes,
  getUserWrittenBoards,
  getUserLikedRecipes,
  getUserLikedBoards,
  follow,
  unFollow,
  followList,
  followingList,
};
