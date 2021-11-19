import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
    <BoardCardInner onClick={_onClick}>
      <TitleInner>
        <Title>{title}</Title>
        <Date>{regDate}</Date>
      </TitleInner>

      <Content>{content}</Content>

      {/* 사진 있을 경우 렌더링 */}
      {isThumbnail && <Image shape="rectangle" size="medium2" src={image} />}

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
    </BoardCardInner>
  );
};

BoardCard.defaultProps = {
  _onClick: () => {},
};

const BoardCardInner = styled.div`
  width: 320px;
  margin: 0px 20px 20px;
`;

const TitleInner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  width: 160px;

  //1줄일떄 말줄임
  overflow: hidden;
  text-overflow: ellipsis; //...처리(1줄일떄만 적용된다)
  white-space: nowrap;
`;

const Date = styled.p`
  color: #999;
  font-size: 10px;
`;

const Content = styled.p`
  margin-top: 4px;
  font-size: 12px;
  color: #191919;

  //2줄이상 말줄임
  overflow: hidden;
  display: -webkit-box; //해당영역을 box형태로 관리.
  -webkit-box-orient: vertical; //수직으로 정렬시킴.
  -webkit-line-clamp: 2; //말줄임 라인수 지정
`;

const IconsInner = styled.div`
  display: flex;
  font-size: 10px;
  height: 16px;
  margin-top: 8px;
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
