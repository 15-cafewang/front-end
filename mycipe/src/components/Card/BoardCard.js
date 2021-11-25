import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { useDispatch } from "react-redux";
// icon
import { ReactComponent as CommentMiniIcon } from "../../assets/icon/CommmentIcon/commentMini.svg";
import { ReactComponent as LikeIcon } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveLikeIcon } from "../../assets/icon/LikeIcon/activeSmallLike.svg";
// elements
import Image from "../../elements/Image";
// async
import { bulletinLikeToggleDB } from "../../redux/Async/bulletinBoard";

const BoardCard = ({
  _onClick,
  commentCount,
  content,
  image,
  likeCount,
  likeStatus,
  nickname,
  regDate,
  title,
  boardId,
}) => {
  const isThumbnail = image ? true : false;
  const dispatch = useDispatch();

  const [componentLikeStatus, setLikeStatus] = useState(likeStatus);
  const [componentLikeCount, setLikeCount] = useState(likeCount);

  const handleLikeToggle = (e) => {
    // 부모 요소의 클릭 이벤트를 막아줌
    e.stopPropagation();
    dispatch(bulletinLikeToggleDB(boardId));

    setLikeStatus(!componentLikeStatus);
  };

  useEffect(() => {
    setLikeStatus(likeStatus);
    setLikeCount(likeCount);
  }, [likeCount, likeStatus]);

  return (
    <BoardCardOuter>
      <BoardCardInner onClick={_onClick}>
        <InnerLeft>
          <Grid flexColumn height="56px">
            <Title>{title}</Title>
            <Content>{content}</Content>
          </Grid>
          <Grid flexRow height="16px">

            <Date>
              {regDate.split("T")[0].replace("-", ". ").replace("-", ". ")}
            </Date>
            <IconsInner>
              {componentLikeStatus ? (
                <LikeInner
                  onClick={(e) => {
                    handleLikeToggle(e);
                    setLikeCount(componentLikeCount - 1);
                  }}
                >
                  <ActiveLikeIcon />
                  <Count>{componentLikeCount}개</Count>
                </LikeInner>
              ) : (
                <LikeInner
                  onClick={(e) => {
                    handleLikeToggle(e);
                    setLikeCount(componentLikeCount + 1);
                  }}
                >
                  <LikeIcon />
                  <Count>{componentLikeCount}개</Count>
                </LikeInner>
              )}

              <CommentInner>
                <CommentMiniIcon />
                <Count>{commentCount}개</Count>
              </CommentInner>
            </IconsInner>
          </Grid>
        </InnerLeft>
        {/* 사진 있을 경우 렌더링 */}
        {isThumbnail && <Image shape="rectangle" size="medium2" src={image} />}
      </BoardCardInner>
      <Line />
    </BoardCardOuter>
  );
};

BoardCard.defaultProps = {
  _onClick: () => {},
};

const Grid = styled.div`
  position: relative;

  height: ${(props) => (props.height ? props.height : "16px")};
  ${(props) =>
    props.flexColumn &&
    css`
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
    `};

  ${(props) =>
    props.flexRow &&
    css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
    `};
`;

const Line = styled.div`
  margin: 14px 0;
  height: 1px;
  /* border-top: 100% solid #ededed; */
  /* padding-top: 1px; */
  width: 100%;
  background-color: #999999;
`;

const BoardCardOuter = styled.div`
  margin: 0px 20px;
`;

const BoardCardInner = styled.div`
  width: 320px;
  height: 80px;

  display: flex;
  justify-content: space-between;
`;

const InnerLeft = styled.div`
  width: 208px;
  margin-right: 12px;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  width: 208px;

  //1줄일떄 말줄임
  overflow: hidden;
  text-overflow: ellipsis; //...처리(1줄일떄만 적용된다)
  white-space: nowrap;
`;

const Date = styled.div`
  color: #999;
  font-size: 10px;
  padding-top: 2px;
  letter-spacing: -0.25px;
  margin-right: 16px;
`;

const Content = styled.p`
  margin-top: 4px;
  font-size: 12px;
  color: #191919;
  width: 208px;

  //2줄이상 말줄임
  overflow: hidden;
  display: -webkit-box; //해당영역을 box형태로 관리.
  -webkit-box-orient: vertical; //수직으로 정렬시킴.
  -webkit-line-clamp: 2; //말줄임 라인수 지정
`;

const IconsInner = styled.div`
  /* position: absolute;
  right: 80px; */
  display: flex;
  font-size: 10px;
  height: 16px;
`;

const LikeInner = styled.button`
  display: flex;
  align-items: center;
  margin-right: 4px;
  font-size: 10px;
`;

const CommentInner = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

const Count = styled.span`
  margin-left: 4px;
  color: #999999;
`;

export default BoardCard;
