import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";

// icon
import { ReactComponent as ActiveLikeIcon } from "../../assets/icon/LikeIcon/activeLike.svg";
import { ReactComponent as LikeIcon } from "../../assets/icon/LikeIcon/like.svg";

// elements
import Image from "../../elements/Image";

// components
// import Comment from "../../shared/Comment";
import BoardComment from "./BoardComment";
import ImageSlider from "../../shared/ImageSlider";
import ModalBackground from "../../shared/ModalBackground";
import PopUp from "../../shared/PopUp";

// async
import {
  cafeLikeToggleDB,
  getCafePostDetailDB,
  deleteCafePostDB,
  addCafeCommentDB,
  getCafeCommentDB,
  getInfinityScrollCafeCommentDB,
} from "../../redux/Async/cafeBoard";

import {
  bulletinLikeToggleDB,
  getBulletinPostDetailDB,
  deleteBulletinPostDB,
  addBulletinCommentDB,
  getBulletinCommentDB,
  getInfinityScrollBulletinCommentDB,
} from "../../redux/Async/bulletinBoard";

// 무한스크롤 Hook
import { useInterSectionObserver } from "../../hooks/index";

const BoardDetail = ({ boardName }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const boardId = params.boardid;
  const cafeId = params.cafeid;

  const userNickname = useSelector((state) => state.user.userInfo.nickname);
  const isActive = useSelector((state) => state.modal.isActive);
  const postDetail = useSelector((state) =>
    boardName === "cafeBoard"
      ? state.cafeBoard.currentcafePost
      : state.bulletinBoard.currentBoardPost
  );

  const commentList = useSelector((state) =>
    boardName === "cafeBoard"
      ? state.cafeBoard.commentList
      : state.bulletinBoard.commentList
  );

  const [likeStatus, setLikeStatus] = useState(
    postDetail && postDetail.likeStatus
  );
  const [likeCount, setLikeCount] = useState(
    postDetail && postDetail.likeCount
  );

  const [content, setContent] = useState(null);

  const target = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(1);
  const inputRef = useRef(null);

  // 새로 고침 시 like 반영
  useEffect(() => {
    setLikeStatus(postDetail && postDetail.likeStatus);
    setLikeCount(postDetail && postDetail.likeCount);
  }, [postDetail]);

  // textarea 높이 자동 resize
  const handleResizeInputHeight = (height, ref) => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = height;
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  // 게시물 상세 불러오기
  useEffect(() => {
    if (boardName === "cafeBoard") {
      dispatch(getCafePostDetailDB(cafeId));
      return;
    }
    if (boardName === "bulletinBoard") {
      dispatch(getBulletinPostDetailDB(boardId));
      return;
    }
  }, [boardId, boardName, dispatch, cafeId]);

  // 댓글 조회
  useEffect(() => {
    const data = {
      page: 1,
      cafeId: cafeId,
    };
    if (boardName === "cafeBoard") {
      dispatch(getCafeCommentDB(data));
      return;
    }
  }, [dispatch, cafeId, boardName]);

  useEffect(() => {
    const data = {
      page: 1,
      boardId: boardId,
    };
    if (boardName === "bulletinBoard") {
      dispatch(getBulletinCommentDB(data));
      return;
    }
  }, [dispatch, boardId, boardName]);

  // 관찰이 시작될 때 실행될 콜백 함수
  const fetchMoreCafe = (page) => {
    setIsLoading(true);
    if (boardName === "cafeBoard") {
      dispatch(
        getInfinityScrollCafeCommentDB({
          page: page,
          cafeId: cafeId,
        })
      )
        .unwrap()
        .then(() => {
          setIsLoading(false);
        });
    } else {
      dispatch(
        getInfinityScrollBulletinCommentDB({
          page: page,
          boardId: boardId,
        })
      )
        .unwrap()
        .then(() => {
          setIsLoading(false);
        });
    }
  };

  useInterSectionObserver(fetchMoreCafe, pageRef, target.current, commentList);

  const isPostUser = (postDetail && postDetail.nickname) === userNickname;

  // 좋아요 누를 때 마다 DB 반영
  const handleLikeToggle = () => {
    if (boardName === "cafeBoard") {
      dispatch(cafeLikeToggleDB(cafeId));
    }
    if (boardName === "bulletinBoard") {
      dispatch(bulletinLikeToggleDB(boardId));
    }

    // 리액트 좋아요 상태도 바꿔준다. (화면에 바로 보여주기 위함)
    setLikeStatus(!likeStatus);
  };

  // 댓글 추가
  const addComment = () => {
    if (content === null) {
      alertPopUp(" 내용을 작성해 주세요!", 1200);
      return;
    }

    const cafeComment = {
      cafeId: cafeId,
      content: content,
    };
    const boardComment = {
      boardId: boardId,
      content: content,
    };

    if (boardName === "cafeBoard") {
      dispatch(addCafeCommentDB(cafeComment));
    }
    if (boardName === "bulletinBoard") {
      dispatch(addBulletinCommentDB(boardComment));
    }

    setContent("");
  };

  //  alert창
  const [popUp, setPopUp] = useState(false);
  const [buttonName, setButtonName] = useState(null);
  const [message, setMsg] = useState("");

  // alert 제어 함수 ( 반복되는 코드를 줄이기위해)
  const alertPopUp = (message, delay = 700) => {
    setPopUp(true);
    setMsg(message);

    setTimeout(() => {
      setPopUp(false);
    }, delay);
  };
  return (
    <BoardDetailContainer>
      {isActive && <ModalBackground />}
      {/* alert 창 */}

      {buttonName === "수정" ? (
        <PopUp
          popUp={popUp}
          setPopUp={setPopUp}
          message="게시물을 수정하시겠습니까?"
          isButton={true}
          buttonName={buttonName}
          _onClick={() => {
            boardName === "cafeBoard"
              ? history.push(`/cafeboard/write/${cafeId}`)
              : history.push(`/bulletinboard/write/${boardId}`);
          }}
        />
      ) : buttonName === "삭제" ? (
        <PopUp
          popUp={popUp}
          setPopUp={setPopUp}
          message="게시물을 삭제하시겠습니까?"
          isButton={true}
          buttonName={buttonName}
          _onClick={() => {
            boardName === "cafeBoard"
              ? dispatch(deleteCafePostDB(cafeId))
              : dispatch(deleteBulletinPostDB(boardId));
          }}
        />
      ) : (
        <PopUp popUp={popUp} setPopUp={setPopUp} message={message} />
      )}

      {/* 
      {buttonName === "삭제" && (
        <PopUp
          popUp={popUp}
          setPopUp={setPopUp}
          message="게시물을 삭제하시겠습니까?"
          isButton={true}
          buttonName={buttonName}
          _onClick={() => {
            boardName === "cafeBoard"
              ? dispatch(deletecafePostDB(cafeId))
              : dispatch(deleteBulletinPostDB(boardId));
          }}
        />
      )} */}
      <Box padding="0px 0px 12px 0px">
        <Box start width="100%">
          <Image
            shape="circle"
            size="small"
            src={postDetail && postDetail.profile}
            _onClick={() => {
              history.push(`/usermain/${postDetail.nickname}`);
            }}
          />
          <Nickname  onClick={() => {
              history.push(`/usermain/${postDetail.nickname}`);
            }}>{postDetail && postDetail.nickname}</Nickname>
        </Box>

        {(isPostUser || userNickname === "admin") && (
          <Box between width="60px">
            <EditBtn
              onClick={() => {
                setPopUp(true);
                setButtonName("수정");
              }}
            >
              수정
            </EditBtn>

            <EditBtn
              onClick={() => {
                setPopUp(true);
                setButtonName("삭제");
              }}
            >
              삭제
            </EditBtn>
          </Box>
        )}
      </Box>

      {postDetail && postDetail.images.length > 0 ? (
        <ImageSlider imageList={postDetail && postDetail.images} />
      ) : (
        ""
      )}

      <Box col>
        {/* 사용자가 올린 해시태그 목록 : 카페 후기 상세일 때만 렌더링 */}
        {boardName === "cafeBoard" ? (
          <>
            <Box width="100%">
              <HashTagBox>
                {postDetail &&
                  postDetail.tags.map((tag) => {
                    return <UserHashTagItem key={tag}>#{tag}</UserHashTagItem>;
                  })}
              </HashTagBox>
            </Box>
            <TextBox height="48" borderNone margin="0px 0px 0px 0px">
              {postDetail && postDetail.title}
            </TextBox>
          </>
        ) : (
          <TextBox height="48" borderNone margin="15px 0px 0px 0px">
            {postDetail && postDetail.title}
          </TextBox>
        )}

        {/* 위치 정보 : 카페 상세페이지 일때만 렌더링 */}
        {boardName === "cafeBoard" && (
          <TextBox height="48" borderNone>
            {postDetail && postDetail.location}
          </TextBox>
        )}

        <TextBox height="240">{postDetail && postDetail.content}</TextBox>

        <Box between width="100%" margin="12px 0px 56px 0px">
          {likeStatus ? (
            <LikeBox
              onClick={() => {
                handleLikeToggle();
                setLikeCount(likeCount - 1);
              }}
            >
              <div
                style={{
                  height: "24px",
                }}
              >
                <ActiveLikeIcon />
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
              <div
                style={{
                  height: "24px",
                }}
              >
                <LikeIcon />
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

        <Box margin="0px 0px 20px 0px" between width="100%">
          <TextInputBox
            width="275px"
            margin="0px 8px 0px 0px"
            ref={inputRef}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addComment()}
            value={content}
            placeholder="댓글을 입력해 주세요."
            onInput={handleResizeInputHeight("50px", inputRef)}
          />
          <Button onClick={addComment}>등록</Button>
        </Box>

        {commentList && (
          <>
            <CommentBox>
              {commentList &&
                commentList.map((comment) => {
                  return (
                    <BoardComment
                      key={comment.commentId}
                      comment={comment}
                      boardName={boardName}
                    />
                  );
                })}
            </CommentBox>
            <div ref={target}>{isLoading && "loading..."}</div>
          </>
        )}
      </Box>
    </BoardDetailContainer>
  );
};

const BoardDetailContainer = styled.div`
  padding: 20px 20px 0px;
  height: auto;
  min-height: calc(100% - 60px);
  position: relative;
`;

const LikeBox = styled.button`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin};
  ${(props) => props.height && `height : ${props.height};`}
  ${(props) => props.padding && `padding : ${props.padding};`}
  ${(props) => props.width && `width : ${props.width};`}
  ${(props) => props.col && `flex-direction : column;`}
  ${(props) => props.cursor === "true" && `cursor : pointer;`};
  ${(props) => props.center && `justify-content : center;`};
  ${(props) => props.start && `justify-content : start;`}
  ${(props) => props.between && `justify-content : space-between;`};
`;

const Nickname = styled.div`
  margin-left: 8px;
  width: 214px;
  font-size: 14px;
  cursor:pointer;
`;

const EditBtn = styled.button`
  font-size: 12px;
  color: #767676;
`;

const HashTagBox = styled.div`
  margin: 8px 0px 8px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 320px;
`;

const UserHashTagItem = styled.div`
  height: 36px;
  padding: 8px 10px;
  margin: 4px 8px 4px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #999999;
  font-size: 14px;
  color: #767676;
`;

const TextBox = styled.pre`
  /* width: ${(props) => props.width}; */
  width: 100%;
  height: ${(props) => props.height}px;
  margin: ${(props) => props.margin};
  padding: 15px 16px;
  font-size: 14px;
  color: #191919;
  border: 1px solid #999999;
  ${(props) => props.margin && `margin : ${props.margin};`}
  ${(props) => props.borderNone && `border-bottom : none;`}

  white-space: pre-wrap;
  word-break: break-all;

  overflow: auto;

  &::placeholder {
    color: #999999;
  }
`;

const TextInputBox = styled.textarea`
  width: ${(props) => props.width};
  /* width: 100%; */
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBtm}px;
  margin: ${(props) => props.margin};
  padding: 15px 16px;
  background: #f8f8fa;
  font-size: 14px;
  color: #191919;

  resize: none;
  overflow: hidden;

  white-space: pre-wrap;
  word-break: break-all;

  &::placeholder {
    color: #999999;
  }
`;

const LikeCount = styled.div`
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
  border: 1px solid #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #767676;
  background-color: #ffffff;
  cursor: pointer;
`;

const CommentBox = styled.div`
  width: 100%;
`;

export default BoardDetail;
