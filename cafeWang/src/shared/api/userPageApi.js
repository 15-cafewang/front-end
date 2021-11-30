import api from "./index";

const getUserInfo = (nickname) => api.get(`/userinfo/${nickname}`);

const getUserWrittencafes = (page, nickname) =>
  api.get(
    `/userinfo/cafes/${nickname}?page=${page}&size=7&isAsc=false&sortBy=regDate`
  );

const getUserWrittenBoards = (page, nickname) =>
  api.get(
    `/userinfo/boards/${nickname}?page=${page}&size=7&isAsc=false&sortBy=regDate`
  );

const getUserLikedcafes = (page, nickname) =>
  api.get(
    `/userinfo/cafes/likes/${nickname}?page=${page}&size=7&isAsc=false&sortBy=regDate`
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
  getUserWrittencafes,
  getUserWrittenBoards,
  getUserLikedcafes,
  getUserLikedBoards,
  follow,
  unFollow,
  followList,
  followingList,
};
