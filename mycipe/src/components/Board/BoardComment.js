import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// elements
import Image from "../../elements/Image";
// icon
import { ReactComponent as SmallLike } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLike } from "../../assets/icon/LikeIcon/activeSmallLike.svg";

import {
  editRecipeCommentDB,
  deleteRecipeCommentDB,
  recipeCommentLikeDB,
} from "../../redux/Async/recipeBoard";
import {
  editBulletinCommentDB,
  deleteBulletinCommentDB,
  bulletinCommentLikeDB,
} from "../../redux/Async/bulletinBoard";

// 날짜 라이브러리
import dayjs from "dayjs";
// 작성일 표시 라이브러리
import TimeCounting from "time-counting";

const BoardComment = ({ _onClick, boardName, commentId, comment }) => {
  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.user.userInfo.nickname);
  const isWriter = comment.nickname === userNickname ? true : false; // 댓글 작성자인지 아닌지 체크
  const [likeStatus, setLikeStatus] = useState(comment.likeStatus);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [content, setContent] = useState(comment.content);
  const [isEdit, setIsEdit] = useState(false);

  const timeOption = {
    lang: "ko",
    objectTime: dayjs().format(`YYYY/MM/DD HH:mm:ss`),
    calculate: {
      justNow: 61,
      //60 초전까지만 조금전 표시
    },
  };
  // 새로 고침 시 like 반영
  useEffect(() => {
    setLikeStatus(likeStatus);
    setLikeCount(likeCount);
  }, []);

  const clickEditBtn = () => {
    setIsEdit(!isEdit);
  };
  const clickCancelBtn = () => {
    setContent(comment.content);
    setIsEdit(false);
  };

  // 댓글 수정
  const editComment = () => {
    const data = {
      commentId: comment.commentId,
      content: content,
    };
    if (boardName === "recipeBoard") {
      dispatch(editRecipeCommentDB(data));
    } else {
      console.log(data);
      dispatch(editBulletinCommentDB(data));
    }

    setIsEdit(false);
    setContent(content);
  };

  // 댓글 삭제
  const deleteComment = () => {
    if (boardName === "recipeBoard") {
      dispatch(deleteRecipeCommentDB(comment.commentId));
    } else {
      dispatch(deleteBulletinCommentDB(comment.commentId));
    }
  };

  // 좋아요 누를 때 마다 DB 반영
  const LikeToggle = () => {
    if (boardName === "recipeBoard") {
      dispatch(recipeCommentLikeDB(comment.commentId));
    } else {
      dispatch(bulletinCommentLikeDB(comment.commentId));
    }

    // 리액트 좋아요 상태도 바꿔준다. (화면에 바로 보여주기 위함)
    setLikeStatus(!likeStatus);
  };
  return (
    <>
      <Box directionCol>
        <Box width="320">
          <CommentItem onClick={_onClick}>
            <Image
              shape="circle"
              size="small"
              src={comment.profile}
              _onClick={() => {
                history.push(`/usermain/${comment.nickname}`);
              }}
            />

            <Box width="280" verCenter col margin="0px 0px 0px 12px">
              <Box margin="0px 0px 4px 0px" height="20">
                <Nickname>{comment.nickname}</Nickname>
                <Date> {TimeCounting(comment.regDate, timeOption)}</Date>
              </Box>
              {isEdit ? (
                <EditInput
                  type="text"
                  placeholder="수정 내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <Box width="270" margin="0px 0px 8px 0px" cmtSize>
                  {comment.content}
                </Box>
              )}

              <Box width="270" horCenter>
                {likeStatus ? (
                  <ActiveSmallLike
                    onClick={() => {
                      LikeToggle();
                      setLikeCount(likeCount - 1);
                    }}
                  />
                ) : (
                  <SmallLike
                    onClick={() => {
                      LikeToggle();
                      setLikeCount(likeCount + 1);
                    }}
                  />
                )}
                <LikeCount>{likeCount}개</LikeCount>

                <Box>
                  {isWriter && (
                    <>
                      {isEdit ? (
                        <>
                          <EditBtn onClick={clickCancelBtn}>취소</EditBtn>
                          <EditBtn onClick={editComment}>완료</EditBtn>
                        </>
                      ) : (
                        <>
                          <EditBtn onClick={clickEditBtn}>수정</EditBtn>
                          <EditBtn onClick={deleteComment}>삭제</EditBtn>
                        </>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </CommentItem>
        </Box>
      </Box>
    </>
  );
};

const Box = styled.div`
  display: flex;
  margin: ${(props) => props.margin};
  ${(props) => props.width && `width : ${props.width}px;`}
  ${(props) => props.height && `height : ${props.height}px;`}
  ${(props) =>
    props.col && `flex-direction : column; justify-content : flex-end;`}
  ${(props) => props.verCenter && `align-items: center;`}
  ${(props) => props.horCenter && `justify-content: space-between;`}
  ${(props) => props.cmtSize && `font-size : 12px; color: #191919;`}
`;

const CommentItem = styled.div`
  margin: 0px 0px 20px 0px;
  display: flex;
  justify-content: space-between;
`;

const Nickname = styled.div`
  margin: 0px 8px 0px 0px;
  width: 230px;
  font-size: 14px;
  color: #191919;
`;

const Date = styled.div`
  font-size: 10px;
  color: #999999;
`;

const LikeCount = styled.div`
  font-size: 12px;
  color: #767676;
  width: 220px;
`;

const EditBtn = styled.button`
  font-size: 10px;
  color: #767676;
`;

const EditInput = styled.input`
  font-size: 12px;
  width: 270px;
  margin: 0 0 8px 0;
  background: #f8f8fa;
`;

export default BoardComment;
