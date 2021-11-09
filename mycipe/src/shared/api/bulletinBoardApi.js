import api from "./index";

export const bulletinBoardApi = {
  // 레시피 목록 조회
  getList: () => {
    return api.get("/boards");
  },

  // 레시피 작성
  addPost: (post) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    return api.post("/boards", post, config);
  },

  // 레시피 수정
  editPost: (boardId, post) => {
    return api.put(`/boards/${boardId}`, post);
  },

  // 레시피 삭제
  deletePost: (boardId) => {
    return api.delete(`/boards/${boardId}`);
  },

  // 레시피 상세 조회
  getPostDetail: (boardId) => {
    return api.get(`/boards/${boardId}`);
  },

  // 댓글 조회
  getComment: (boardId) => {
    return api.get(`/boards/comments/${boardId}`);
  },

  // 댓글 작성
  addComment: (comment) => {
    return api.post("/boards/comments", comment);
  },

  // 댓글 수정
  editComment: (commentId, comment) => {
    return api.put(`/boards/comments/${commentId}`, comment);
  },

  // 댓글 삭제
  deleteComment: (commentId) => {
    return api.delete(`/boards/comments/${commentId}`);
  },

  // 좋아요 토글
  likeToggle: (boardId) => {
    return api.post(`/boards/likes/${boardId}`);
  },
};
