import api from "./index";

export const cafeBoardApi = {
  // 레시피 목록 조회 (최신순, 인기순)
  getPostList: (page, sortBy) => {
    return api.get(`/cafes/list?page=${page}&size=7&isAsc=false&${sortBy}`);
  },

  // 레시피 작성
  addPost: (post) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return api.post("/cafes", post, config);
  },

  // 레시피 수정
  editPost: (cafeId, post) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return api.put(`/cafes/${cafeId}`, post, config);
  },

  // 레시피 삭제
  deletePost: (cafeId) => {
    return api.delete(`/cafes/${cafeId}`);
  },

  // 레시피 상세 조회
  getPostDetail: (cafeId) => {
    return api.get(`/cafes/${cafeId}`);
  },

  // 댓글 조회
  getComment: (cafeId, page) => {
    return api.get(`/cafes/comment/${cafeId}?page=${page}&size=8&isAsc=false`);
  },

  // 댓글 작성
  addComment: (comment) => {
    return api.post("/cafes/comment", comment);
  },

  // 댓글 수정
  editComment: (commentId, content) => {
    return api.put(`/cafes/comment/${commentId}`, {
      content: content,
    });
  },

  // 댓글 삭제
  deleteComment: (commentId) => {
    return api.delete(`/cafes/comment/${commentId}`);
  },

  // 좋아요 토글
  likeToggle: (postId) => {
    return api.get(`/cafes/likes/${postId}`);
  },

  // 레시피 댓글 좋아요 토글
  commentLikeToggle: (commentId) => {
    return api.get(`/cafes/comment/likes/${commentId}`);
  },
};
