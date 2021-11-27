import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// elements
import Image from "../../elements/Image";
// icon
import { ReactComponent as SmallLike } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLike } from "../../assets/icon/LikeIcon/activeSmallLike.svg";

import {
  editCafeCommentDB,
  deleteCafeCommentDB,
  cafeCommentLikeDB,
} from "../../redux/Async/cafeBoard";
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
  const userNickname = useSelector((state) => state.user.userInfo.nickname); // 유저닉네임
  const isWriter = comment.nickname === userNickname ? true : false; // 댓글 작성자인지 아닌지 체크
  const [likeStatus, setLikeStatus] = useState(comment.likeStatus); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(comment.likeCount); // 좋아요 개수
  const [content, setContent] = useState(comment.content); // 댓글 입력 값을 저장합니다.
  const [isEdit, setIsEdit] = useState(false); // 수정 모드인지 아닌지 체크합니다.
  const inputRef = useRef(null); // 댓글창 size를 자동으로 조절해주기 위함입니다.

  // 댓글 작성 시간 표시 기본 설정
  const timeOption = {
    lang: "ko",
    objectTime: dayjs().format(`YYYY/MM/DD HH:mm:ss`),
    calculate: {
      justNow: 61,
      //60 초전까지만 조금전 표시
    },
  };

  // textarea 높이 자동 resize
  const handleResizeInputHeight = (height, ref) => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = height;
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  // 새로 고침 시 like 반영
  useEffect(() => {
    setLikeStatus(likeStatus);
    setLikeCount(likeCount);
  }, []);

  const clickEditBtn = () => {
    //isEdit가 false가 되면 text가 나타나고, true면 input이 나타납니다.
    setIsEdit(!isEdit);
  };

  const clickCancelBtn = () => {
    // 수정모드에서 취소를 누를 떄, 사용합니다
    setContent(comment.content);
    setIsEdit(false);
  };

  // 댓글 수정
  const editComment = () => {
    const data = {
      commentId: comment.commentId,
      content: content,
    };
    if (boardName === "cafeBoard") {
      dispatch(editCafeCommentDB(data));
    } else {
      dispatch(editBulletinCommentDB(data));
    }

    setIsEdit(false);
    setContent(content);
  };

  // 댓글 삭제
  const deleteComment = () => {
    if (boardName === "cafeBoard") {
      dispatch(deleteCafeCommentDB(comment.commentId));
    } else {
      dispatch(deleteBulletinCommentDB(comment.commentId));
    }
  };

  // 좋아요 누를 때 마다 DB 반영
  const LikeToggle = () => {
    if (boardName === "cafeBoard") {
      dispatch(cafeCommentLikeDB(comment.commentId));
    } else {
      dispatch(bulletinCommentLikeDB(comment.commentId));
    }

    // 리액트 좋아요 상태도 바꿔준다. (화면에 바로 보여주기 위함)
    setLikeStatus(!likeStatus);
  };
  return (
    <>
      <Box width="100%">
        <Box>
          <CommentItem onClick={_onClick}>
            <Image
              shape="circle"
              size="small"
              src={comment.profile}
              _onClick={() => {
                history.push(`/usermain/${comment.nickname}`);
              }}
            />

            <Box verCenter col margin="0px 0px 0px 12px">
              <Box
                width="100%"
                margin="0px 0px 4px 0px"
                height="20"
                verCenter
                between
              >
                <Nickname>{comment.nickname}</Nickname>
                <Date> {TimeCounting(comment.regDate, timeOption)}</Date>
              </Box>
              {isEdit ? (
                <EditInput
                  ref={inputRef}
                  type="text"
                  placeholder="수정 내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onInput={handleResizeInputHeight("50px", inputRef)}
                />
              ) : (
                <CommmentContent>{comment.content}</CommmentContent>
              )}

              <Box width="100%" between>
                {likeStatus ? (
                  <LikeBox
                    onClick={() => {
                      LikeToggle();
                      setLikeCount(likeCount - 1);
                    }}
                  >
                    <div>
                      <ActiveSmallLike />
                    </div>
                    <LikeCount>{likeCount}개</LikeCount>
                  </LikeBox>
                ) : (
                  <LikeBox
                    onClick={() => {
                      LikeToggle();
                      setLikeCount(likeCount + 1);
                    }}
                  >
                    <div>
                      <SmallLike />
                    </div>
                    <LikeCount>{likeCount}개</LikeCount>
                  </LikeBox>
                )}

                <Box>
                  {isWriter && (
                    <>
                      {isEdit ? (
                        <>
                          <EditBtn
                            margin="0px 15px 0px 0px"
                            onClick={clickCancelBtn}
                          >
                            취소
                          </EditBtn>
                          <EditBtn onClick={editComment}>완료</EditBtn>
                        </>
                      ) : (
                        <>
                          <EditBtn
                            margin="0px 15px 0px 0px"
                            onClick={clickEditBtn}
                          >
                            수정
                          </EditBtn>
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
  ${(props) => props.width && `width : ${props.width};`}
  ${(props) => props.height && `height : ${props.height}px;`}
  ${(props) =>
    props.col && `flex-direction : column; justify-content : flex-end;`}
  ${(props) => props.verCenter && `align-items: center;`}
  ${(props) => props.between && `justify-content: space-between;`}
  ${(props) => props.cmtSize && `font-size : 12px; color: #191919;`}
`;

const CommentItem = styled.div`
  width: 100%;
  margin: 0px 0px 20px 0px;
  display: flex;
  justify-content: space-between;
`;

const CommmentContent = styled.pre`
  width: 100%;
  margin: 0px 0px 8px 0px;
  font-size: 12px;
  color: #191919;

  white-space: pre-wrap;
  word-break: break-all;
`;

const Nickname = styled.div`
  margin: 0px 8px 0px 0px;
  width: 260px;
  flex: auto; // flex : 1 1 auto;
  font-size: 14px;
  color: #191919;
`;

const Date = styled.div`
  flex: none; // flex : 0 0 auto;

  font-size: 10px;
  color: #999999;
`;

const LikeBox = styled.button`
  width: 40px;

  display: flex;
  align-items: center;
`;

const LikeCount = styled.div`
  font-size: 12px;
  color: #767676;
  width: 220px;
`;

const EditBtn = styled.button`
  ${(props) => props.margin && `margin : ${props.margin};`};
  font-size: 10px;
  color: #767676;
`;

const EditInput = styled.textarea`
  font-size: 12px;
  padding: 15px 16px;
  width: 270px;
  margin: 0 0 8px 0;
  background: #f8f8fa;

  resize: none;
  overflow: hidden;

  white-space: pre-wrap;
  word-break: break-all;
`;

export default BoardComment;
