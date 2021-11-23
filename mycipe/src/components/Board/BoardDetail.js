import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";
// icon
import { ReactComponent as ActiveSmallLikeIcon } from "../../assets/icon/LikeIcon/activeSmallLike.svg";
import { ReactComponent as SmallLikeIcon } from "../../assets/icon/LikeIcon/smallLike.svg";
// elements
import Image from "../../elements/Image";
// components
import BoardComment from "./BoardComment";
import ImageSlider from "../../shared/ImageSlider";
import ModalBackground from "../../shared/ModalBackground";
// async
import {
  recipeLikeToggleDB,
  getRecipePostDetailDB,
  deleteRecipePostDB,
  addRecipeCommentDB,
  getRecipeCommentDB,
} from "../../redux/Async/recipeBoard";
import {
  bulletinLikeToggleDB,
  getBulletinPostDetailDB,
  deleteBulletinPostDB,
  addBulletinCommentDB,
  getBulletinCommentDB,
} from "../../redux/Async/bulletinBoard";

const BoardDetail = ({ boardName }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const boardId = params.boardid;
  const recipeId = params.recipeid;

  const userNickname = useSelector((state) => state.user.userInfo.nickname);
  const isActive = useSelector((state) => state.modal.isActive);
  const postDetail = useSelector((state) =>
    boardName === "recipeBoard"
      ? state.recipeBoard.currentRecipePost
      : state.bulletinBoard.currentBoardPost
  );
  const commentList = useSelector((state) =>
    boardName === "recipeBoard"
      ? state.recipeBoard.commentList
      : state.bulletinBoard.commentList
  );

  const [likeStatus, setLikeStatus] = useState(
    postDetail && postDetail.likeStatus
  );
  const [likeCount, setLikeCount] = useState(
    postDetail && postDetail.likeCount
  );

  const [content, setContent] = useState("");

  // 새로 고침 시 like 반영
  useEffect(() => {
    setLikeStatus(postDetail && postDetail.likeStatus);
    setLikeCount(postDetail && postDetail.likeCount);
  }, [postDetail]);

  // 게시물 상세 불러오기
  useEffect(() => {
    if (boardName === "recipeBoard") {
      dispatch(getRecipePostDetailDB(recipeId));
      return;
    }
    if (boardName === "bulletinBoard") {
      dispatch(getBulletinPostDetailDB(boardId));
      return;
    }
  }, [boardId, boardName, dispatch, recipeId]);

  // 댓글 조회
  useEffect(() => {
    if (boardName === "recipeBoard") {
      dispatch(getRecipeCommentDB(recipeId));
      return;
    }
    if (boardName === "bulletinBoard") {
      dispatch(getBulletinCommentDB(boardId));
      return;
    }
  }, [dispatch, recipeId, boardId, boardName]);
  const isPostUser = (postDetail && postDetail.nickname) === userNickname;

  // 좋아요 누를 때 마다 DB 반영
  const handleLikeToggle = () => {
    if (boardName === "recipeBoard") {
      dispatch(recipeLikeToggleDB(recipeId));
    }
    if (boardName === "bulletinBoard") {
      dispatch(bulletinLikeToggleDB(boardId));
    }

    // 리액트 좋아요 상태도 바꿔준다. (화면에 바로 보여주기 위함)
    setLikeStatus(!likeStatus);
  };

  // 댓글 추가
  const addComment = () => {
    const recipeComment = {
      recipeId: recipeId,
      content: content,
    };
    const boardComment = {
      boardId: boardId,
      content: content,
    };

    if (boardName === "recipeBoard") {
      dispatch(addRecipeCommentDB(recipeComment));
    }
    if (boardName === "bulletinBoard") {
      dispatch(addBulletinCommentDB(boardComment));
    }

    setContent("");
  };

  return (
    <BoardDetailContainer>
      {isActive && <ModalBackground />}
      <Box margin="0px 0px 16px 0px">
        <Image
          shape="circle"
          size="small"
          src={postDetail && postDetail.profile}
          _onClick={() => {
            history.push(`/usermain/${postDetail.nickname}`);
          }}
        />
        <Nickname>{postDetail && postDetail.nickname}</Nickname>
        {isPostUser && (
          <Box between width="60px">
            <EditBtn
              onClick={() => {
                if (boardName === "recipeBoard") {
                  history.push(`/recipeboard/write/${recipeId}`);
                } else {
                  history.push(`/bulletinboard/write/${boardId}`);
                }
              }}
            >
              수정
            </EditBtn>

            <EditBtn
              onClick={() => {
                if (boardName === "recipeBoard") {
                  dispatch(deleteRecipePostDB(recipeId));
                } else {
                  dispatch(deleteBulletinPostDB(boardId));
                }
              }}
            >
              삭제
            </EditBtn>
          </Box>
        )}
      </Box>

      <ImageSlider imageList={postDetail && postDetail.images} />

      <Box col margin="12px 0px 0px">
        {/* 사용자가 올린 해시태그 목록 : 레시피 상세일 때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <HashTagBox>
            {postDetail &&
              postDetail.tags.map((tag) => {
                return <UserHashTagItem key={tag}>#{tag}</UserHashTagItem>;
              })}
          </HashTagBox>
        )}

        <TextBox width="320" height="48" marginBtm="8">
          {postDetail && postDetail.title}
        </TextBox>

        {/* 가격 정보 : 레시피 상세페이지 일때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <TextBox width="320" height="48" marginBtm="8">
            {postDetail && postDetail.location}
          </TextBox>
        )}

        <TextBox width="320" height="240">
          {postDetail && postDetail.content}
        </TextBox>

        <Box between width="320px" margin="12px 0px 56px 0px">
          {likeStatus ? (
            <LikeBox
              onClick={() => {
                handleLikeToggle();
                setLikeCount(likeCount - 1);
              }}
            >
              <div>
                <ActiveSmallLikeIcon />
              </div>
              <LikeCount>{likeCount}개</LikeCount>
            </LikeBox>
          ) : (
            <LikeBox
              onClick={() => {
                handleLikeToggle();
                setLikeCount(likeCount + 1);
              }}
            >
              <div>
                <SmallLikeIcon />
              </div>
              <LikeCount>{likeCount}개</LikeCount>
            </LikeBox>
          )}

          <Date>
            {postDetail && postDetail.regDate
              ? postDetail.regDate
                  .split("T")[0]
                  .replace("-", ". ")
                  .replace("-", ". ")
              : ""}
          </Date>
        </Box>

        <Box width="320px" margin="0px 0px 20px 0px">
          <TextInputBox
            width="262"
            height="50"
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addComment()}
            value={content}
            placeholder="댓글을 입력해 주세요."
          />
          <Button onClick={addComment}>등록</Button>
        </Box>
        {commentList && (
          <>
            <CommentBox>
              {commentList &&
                boardName === "recipeBoard" &&
                commentList.map((comment) => {
                  return (
                    <BoardComment
                      key={comment.commentId}
                      comment={comment}
                      boardId={boardId}
                      boardName={boardName}
                    />
                  );
                })}
              {commentList &&
                boardName === "bulletinBoard" &&
                commentList.map((comment) => {
                  return (
                    <BoardComment
                      key={comment.commentId}
                      comment={comment}
                      boardId={boardId}
                      boardName={boardName}
                    />
                  );
                })}
            </CommentBox>
          </>
        )}
      </Box>
    </BoardDetailContainer>
  );
};

const BoardDetailContainer = styled.div`
  padding: 0px 20px;
  height: auto;
  min-height: calc(100% - 60px);
  position: relative;
`;

const LikeBox = styled.button`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  ${(props) => props.width && `width : ${props.width};`}
  ${(props) => props.col && `flex-direction : column;`}
  margin: ${(props) => props.margin};
  ${(props) => props.cursor === "true" && `cursor : pointer`};
  display: flex;
  align-items: center;
  ${(props) => props.between && `justify-content : space-between`};
`;

const Nickname = styled.div`
  margin-left: 8px;
  width: 214px;
  font-size: 14px;
`;

const EditBtn = styled.button`
  font-size: 12px;
  color: #767676;
`;

const HashTagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 320px;
  margin-bottom: 12px;
`;

const UserHashTagItem = styled.div`
  height: 36px;
  padding: 8px 10px;
  margin: 0px 8px 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.active ? `1px solid #7692E4` : `1px solid #dbdbdb`};
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => (props.active ? `#ffffff` : `#767676`)};
  background-color: ${(props) => (props.active ? `#7692E4` : `#ffffff`)};
  cursor: pointer;
`;

const TextBox = styled.pre`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBtm}px;
  padding: 15px 16px;
  background: #f8f8fa;
  border-radius: 6px;
  font-size: 14px;
  color: #191919;
  white-space: pre-wrap;
  word-break: break-all;

  &::placeholder {
    color: #999999;
  }
`;

const TextInputBox = styled.input`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBtm}px;
  padding: 15px 16px;
  background: #f8f8fa;
  border-radius: 6px;
  font-size: 14px;
  color: #191919;

  &::placeholder {
    color: #999999;
  }
`;

const LikeCount = styled.div`
  top: 4px;
  font-size: 12px;
  color: #767676;
  margin-left: 4px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #767676;
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #767676;
  background-color: #ffffff;
`;

const CommentBox = styled.div``;

export default BoardDetail;
