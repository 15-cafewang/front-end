import api from "./index";

const getUserInfo = (nickname) => api.get(`/userinfo/${nickname}`);

const getUserWrittenRecipes = (nickname) =>
  api.get(
    `/userinfo/recipes/${nickname}?page=1&size=10&isAsc=false&sortBy=regDate`
  );

const getUserWrittenBoardes = (nickname) =>
  api.get(
    `/userinfo/boards/${nickname}?page=1&size=10&isAsc=false&sortBy=regDate`
  );

const getUserLikeRecipes = (nickname) =>
  api.get(
    `/userinfo/recipes/likes/${nickname}?page=1&size=10&isAsc=false&sortBy=regDate`
  );

const getUserLikeBoards = (nickname) =>
  api.get(
    `/userinfo/boards/likes/${nickname}?page=1&size=10&isAsc=false&sortBy=regDate`
  );

const follow = (nickname) => api.post(`/follows/${nickname}`);

const unFollow = (nickname) => api.delete(`/follows/${nickname}`);

export {
  getUserInfo,
  getUserWrittenRecipes,
  getUserWrittenBoardes,
  getUserLikeRecipes,
  getUserLikeBoards,
  follow,
  unFollow,
};
