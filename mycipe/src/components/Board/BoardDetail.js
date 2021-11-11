import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";
// icon
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as ActiveSmallLikeIcon } from "../../assets/icon/LikeIcon/activeSmallLike.svg";
import { ReactComponent as SmallLikeIcon } from "../../assets/icon/LikeIcon/smallLike.svg";
// elements
import Image from "../../elements/Image";
// components
import Comment from "../../shared/Comment";
import ImageSlider from "../../shared/ImageSlider";
import ModalBackground from "../../shared/ModalBackground";
// async
import {
  recipeLikeToggleDB,
  getRecipePostDetailDB,
  deleteRecipePostDB,
} from "../../redux/Async/recipeBoard";
import {
  bulletinLikeToggleDB,
  getBulletinPostDetailDB,
  deleteBulletinPostDB,
} from "../../redux/Async/bulletinBoard";

const BoardDetail = ({ boardName }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const boardId = params.boardid;
  const recipeId = params.recipeid;

  console.log(boardId);
  const isActive = useSelector((state) => state.modal.isActive);
  const postDetail = useSelector((state) =>
    boardName === "recipeBoard"
      ? state.recipeBoard.currentRecipePost
      : state.bulletinBoard.currentBoardPost
  );

  const [menuActive, setMenuActive] = useState(false);
  const [likeStatus, setLikeStatus] = useState(
    postDetail && postDetail.likeStatus
  );
  const [likeCount, setLikeCount] = useState(
    postDetail && postDetail.likeCount
  );

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

  console.log(postDetail);
  return (
    <BoardDetailContainer>
      {isActive && <ModalBackground />}
      <Box margin="0px 0px 16px 0px">
        <Image
          shape="circle"
          size="small"
          src={postDetail && postDetail.profile}
        />
        <Nickname>{postDetail && postDetail.nickname}</Nickname>
        <button
          onClick={() => {
            setMenuActive(!menuActive);
          }}
        >
          <MenuIcon />
        </button>
      </Box>
      {menuActive && (
        <Menu>
          <button
            onClick={() => {
              if (boardName === "recipeBoard") {
                history.push(`/recipeboard/write/${recipeId}`);
              } else {
                history.push(`/bulletinboard/write/${boardId}`);
              }
            }}
          >
            수정하기
          </button>
          <button
            onClick={() => {
              if (boardName === "recipeBoard") {
                dispatch(deleteRecipePostDB(recipeId));
              } else {
                dispatch(deleteBulletinPostDB(boardId));
              }
            }}
          >
            삭제하기
          </button>
        </Menu>
      )}
      <ImageSlider imageList={postDetail && postDetail.images} />

      <Box col margin="12px 0px 0px">
        {/* 사용자가 올린 해시태그 목록 : 레시피 상세일 때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <HashTagBox>
            {postDetail &&
              postDetail.tags.map((tag) => {
                return <UserHashTagItem key={tag}>{tag}</UserHashTagItem>;
              })}
          </HashTagBox>
        )}

        <TextBox width="320" height="48" marginBtm="8">
          {postDetail && postDetail.title}
        </TextBox>

        {/* 가격 정보 : 레시피 상세페이지 일때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <TextBox width="320" height="48" marginBtm="8">
            {postDetail && postDetail.price}원
          </TextBox>
        )}

        <TextBox width="320" height="240">
          {postDetail && postDetail.content}
        </TextBox>

        <Box width="320px" margin="12px 0px 56px 0px">
          {likeStatus ? (
            <Box cursor="true">
              <ActiveSmallLikeIcon
                onClick={() => {
                  handleLikeToggle();
                  setLikeCount(likeCount - 1);
                }}
              />
            </Box>
          ) : (
            <Box cursor="true">
              <SmallLikeIcon
                onClick={() => {
                  handleLikeToggle();
                  setLikeCount(likeCount + 1);
                }}
              />
            </Box>
          )}
          <LikeCount>{likeCount}개</LikeCount>
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
            placeholder="댓글을 입력해 주세요."
          />
          <Button>등록</Button>
        </Box>

        <Comment />
        <Comment />
        <Comment />
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

const Box = styled.div`
  ${(props) => props.width && `width : ${props.width};`}
  ${(props) => props.col && `flex-direction : column;`}
  margin: ${(props) => props.margin};
  ${(props) => props.cursor === "true" && `cursor : pointer`};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.div`
  margin-left: 8px;
  width: 250px;
  font-size: 14px;
`;

const Menu = styled.div`
  width: 120px;
  height: 81px;
  background: pink;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
  right: 35px;
  top: 10px;
  z-index: 20;
  position: absolute;
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

const TextBox = styled.div`
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
  font-size: 12px;
  color: #767676;
  width: 220px;
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

export default BoardDetail;
