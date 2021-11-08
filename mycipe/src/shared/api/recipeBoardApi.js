import api from "./index";

export const recipeBoardApi = {
  // 레시피 목록 조회
  getList: () => {
    return api.get("/recipes/list/");
  },

  // 레시피 작성
  addPost: (post) => {
    return api.post("/recipes", post);
  },

  // 레시피 수정
  editPost: (recipeId, post) => {
    return api.put(`/recipes/${recipeId}`, post);
  },

  // 레시피 삭제
  deletePost: (recipeId) => {
    return api.delete(`/recipes/${recipeId}`);
  },

  // 레시피 상세 조회
  getPostDetail: (recipeId) => {
    return api.get(`/recipes/${recipeId}`);
  },

  // 댓글 조회
  getComment: (recipeId) => {
    return api.get(`/recipes/comment/${recipeId}`);
  },

  // 댓글 작성
  addComment: (comment) => {
    return api.post("/recipes/comment", comment);
  },

  // 댓글 수정
  editComment: (commentId, comment) => {
    return api.put(`/recipes/comment/${commentId}`, comment);
  },

  // 댓글 삭제
  deleteComment: (commentId) => {
    return api.delete(`/recipes/comment/${commentId}`);
  },

  // 좋아요 토글
  likeToggle: (postId) => {
    return api.post(`/recipes/likes/${postId}`);
  },
};
