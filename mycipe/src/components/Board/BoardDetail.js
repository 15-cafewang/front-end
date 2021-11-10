import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
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
import { getRecipePostDetailDB } from "../../redux/Async/recipeBoard";
import { getBulletinPostDetailDB } from "../../redux/Async/bulletinBoard";

const BoardDetail = ({ boardName }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const boardId = params.boardid;
  const recipeId = params.recipeid;
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    if (boardName === "recipeBoard") {
      dispatch(getRecipePostDetailDB(recipeId));
      return;
    }
    if (boardName === "bulletinBoard") {
      dispatch(getBulletinPostDetailDB(boardId));
      return;
    }
  }, []);

  const isActive = useSelector((state) => state.modal.isActive);
  const postDetail = useSelector((state) =>
    boardName === "recipeBoard"
      ? state.recipeBoard.currentRecipePost
      : state.bulletinBoard.currentBoardPost
  );

  console.log(likeStatus);
  // 레시피
  // content: "test";
  // images: (2)[
  //   ("https://99final.s3.ap-northeast-2.amazonaws.com/re…E1%85%A1%E1%86%AB%E1%84%91%E1%85%AE%E1%86%BC.jpeg",
  //   "https://99final.s3.ap-northeast-2.amazonaws.com/re…a59-45dd-836a-65661ef28b13%E3%85%8B%E3%85%8B.jpeg")
  // ];
  // likeCount: 0;
  // likeStatus: false;
  // nickname: "박하린";
  // recipeId: 49;
  // regdate: "2021-11-09T20:23:05.499772";
  // tags: (2)[("#고소한", "#단짠")];
  // title: "test";

  // 게시판
  // boardId: 21;
  // content: "test2";
  // images: (2)[
  //   ("https://99final.s3.ap-northeast-2.amazonaws.com/bo…E1%85%A1%E1%86%AB%E1%84%91%E1%85%AE%E1%86%BC.jpeg",
  //   "https://99final.s3.ap-northeast-2.amazonaws.com/bo…59c-46f7-8d6f-0605b3825507%E3%85%8B%E3%85%8B.jpeg")
  // ];
  // likeCount: 0;
  // likeStatus: false;
  // nickname: "박하린";
  // profile: "https://user-images.githubusercontent.com/76515226/140890775-30641b72-226a-4068-8a0a-9a306e8c68b4.png";
  // regDate: "2021-11-09T20:17:05.050432";
  // title: "test2";

  return (
    <BoardDetailContainer>
      {isActive && <ModalBackground />}
      <Box margin="0px 0px 16px 0px">
        <Image shape="circle" size="small" src={postDetail.profile} />
        <Nickname>{postDetail.nickname}</Nickname>
        <MenuIcon />
      </Box>

      <ImageSlider imageList={postDetail.images} />

      <Box col margin="12px 0px 0px">
        {/* 사용자가 올린 해시태그 목록 : 레시피 상세일 때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <HashTagBox>
            {postDetail.tags &&
              postDetail.tags.map((tag) => {
                return <UserHashTagItem key={tag}>{tag}</UserHashTagItem>;
              })}
          </HashTagBox>
        )}

        <TextInputBox
          width="320"
          height="48"
          marginBtm="8"
          value={postDetail.title}
        />

        {/* 가격 정보 : 레시피 상세페이지 일때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <TextInputBox
            width="320"
            height="48"
            marginBtm="8"
            value={postDetail.price}
          />
        )}

        <TextInputBox width="320" height="240" value={postDetail.content} />

        <Box width="320px" margin="12px 0px 56px 0px">
          {postDetail.likeStatus ? (
            <ActiveSmallLikeIcon
              onClick={() => {
                setLikeStatus(false);
              }}
            />
          ) : (
            <SmallLikeIcon
              onClick={() => {
                setLikeStatus(true);
              }}
            />
          )}
          <LikeCount>{postDetail.likeCount}개</LikeCount>
          <Date>
            {postDetail.regDate &&
              postDetail.regDate
                .split("T")[0]
                .replace("-", ". ")
                .replace("-", ". ")}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.div`
  margin-left: 8px;
  width: 250px;
  font-size: 14px;
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

const TextInputBox = styled.textarea`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBtm}px;
  padding: 15px 16px;
  background: #f8f8fa;
  border-radius: 6px;

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
