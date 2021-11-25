import api from "./index";

export const recipeBoardApi = {
  // 레시피 목록 조회 (최신순, 인기순)
  getPostList: (page, sortBy) => {
    return api.get(`/recipes/list?page=${page}&size=7&isAsc=false&${sortBy}`);
  },

  // 레시피 작성
  addPost: (post) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return api.post("/recipes", post, config);
  },

  // 레시피 수정
  editPost: (recipeId, post) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return api.put(`/recipes/${recipeId}`, post, config);
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
  getComment: (recipeId, page) => {
    return api.get(
      `/recipes/comment/${recipeId}?page=${page}&size=8&isAsc=false`
    );
  },

  // 댓글 작성
  addComment: (comment) => {
    return api.post("/recipes/comment", comment);
  },

  // 댓글 수정
  editComment: (commentId, content) => {
    return api.put(`/recipes/comment/${commentId}`, {
      content: content,
    });
  },

  // 댓글 삭제
  deleteComment: (commentId) => {
    return api.delete(`/recipes/comment/${commentId}`);
  },

  // 좋아요 토글
  likeToggle: (postId) => {
    return api.get(`/recipes/likes/${postId}`);
  },

  // 레시피 댓글 좋아요 토글
  commentLikeToggle: (commentId) => {
    return api.get(`/recipes/comment/likes/${commentId}`);
  },
};
