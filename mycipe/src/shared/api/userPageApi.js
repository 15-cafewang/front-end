import api from "./index";

const getUserInfo = (nickname) => api.get(`/userinfo/${nickname}`);

const getMyRecipes = (nickname) => api.get(`/userinfo/recipes/${nickname}`);

const getMyBoardes = (nickname) => api.get(`/userinfo/boards/${nickname}`);

const getMyLikeRecipes = (nickname) =>
  api.get(`/userinfo/recipes/likes/${nickname}`);

const getMyLikeBoards = (nickname) =>
  api.get(`/userinfo/boards/likes/${nickname}`);
export {
  getUserInfo,
  getMyRecipes,
  getMyBoardes,
  getMyLikeRecipes,
  getMyLikeBoards,
};
