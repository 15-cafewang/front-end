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

export {
  getUserInfo,
  getUserWrittenRecipes,
  getUserWrittenBoardes,
  getUserLikeRecipes,
  getUserLikeBoards,
};
