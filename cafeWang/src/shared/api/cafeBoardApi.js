import api from "./index";

// 카페 목록 조회 (최신순, 인기순)
const getPostList = (page, sortBy) => {
  return api.get(`/cafes/list?page=${page}&size=7&isAsc=false&${sortBy}`);
};

// 카페 작성
const addPost = (post) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return api.post("/cafes", post, config);
};

// 카페 수정
const editPost = (cafeId, post) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return api.put(`/cafes/${cafeId}`, post, config);
};

// 카페 삭제
const deletePost = (cafeId) => {
  return api.delete(`/cafes/${cafeId}`);
};

// 카페 상세 조회
const getCafeDetail = (cafeId) => {
  return api.get(`/cafes/${cafeId}`);
};

// 댓글 조회
const getComment = (cafeId, page) => {
  return api.get(`/cafes/comment/${cafeId}?page=${page}&size=8&isAsc=false`);
};

// 댓글 작성
const addComment = (comment) => {
  return api.post("/cafes/comment", comment);
};

// 댓글 수정
const editComment = (commentId, content) => {
  return api.put(`/cafes/comment/${commentId}`, {
    content: content,
  });
};

// 댓글 삭제
const deleteComment = (commentId) => {
  return api.delete(`/cafes/comment/${commentId}`);
};

// 좋아요 토글
const likeToggle = (postId) => {
  return api.get(`/cafes/likes/${postId}`);
};

// 카페 댓글 좋아요 토글
const commentLikeToggle = (commentId) => {
  return api.get(`/cafes/comment/likes/${commentId}`);
};

export {
  getPostList,
  addPost,
  editPost,
  deletePost,
  getCafeDetail,
  getComment,
  addComment,
  editComment,
  deleteComment,
  likeToggle,
  commentLikeToggle,
};
