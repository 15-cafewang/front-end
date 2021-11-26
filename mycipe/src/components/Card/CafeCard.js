import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
// icons
import { ReactComponent as SmallLike } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLike } from "../../assets/icon/LikeIcon/activeSmallLike.svg";
// elements
import Image from "../../elements/Image";
// async
import { cafeLikeToggleDB } from "../../redux/Async/cafeBoard";

const CafeCard = ({
  _onClick,
  commentCount,
  content,
  cafeId,
  image,
  likeCount,
  likeStatus,
  nickname,
  location,
  title,
}) => {
  const isImage = image ? `${image}` : "";
  const dispatch = useDispatch();

  const [componentLikeStatus, setLikeStatus] = useState(likeStatus);
  const [componentLikeCount, setLikeCount] = useState(likeCount);

  const handleLikeToggle = (e) => {
    // 부모 요소의 클릭 이벤트를 막아줌
    e.stopPropagation();
    dispatch(cafeLikeToggleDB(cafeId));

    setLikeStatus(!componentLikeStatus);
  };

  useEffect(() => {
    setLikeStatus(likeStatus);
    setLikeCount(likeCount);
  }, [likeCount, likeStatus]);

  return (
    <CafeCardInner onClick={_onClick}>
      <Image shape="rectangle" src={isImage} size="medium" border />
      <CardContent>
        <TextInner>
          <Title>{title}</Title>
          <Text>{nickname}</Text>
          <Text>{location}</Text>
        </TextInner>
        {componentLikeStatus ? (
          <LikeInner
            onClick={(e) => {
              handleLikeToggle(e);
              setLikeCount(componentLikeCount - 1);
            }}
          >
            <ActiveSmallLike />
            <Count>{componentLikeCount}개</Count>
          </LikeInner>
        ) : (
          <LikeInner
            onClick={(e) => {
              handleLikeToggle(e);
              setLikeCount(componentLikeCount + 1);
            }}
          >
            <SmallLike />
            <Count>{componentLikeCount}개</Count>
          </LikeInner>
        )}
      </CardContent>
    </CafeCardInner>
  );
};

CafeCard.defaultProps = {
  _onClick: () => {},
};

const CafeCardInner = styled.li`
  height: 112px;
  display: flex;
  margin: 12px 0px 0px;
  width: 320px;
`;

const CardContent = styled.div`
  background: #f8f8fa;
  border: 1px solid #767676;
  width: 208px;
`;

const TextInner = styled.div`
  margin: 12px 12px 0px;
`;

const Text = styled.p`
  font-size: 12px;
  margin: 2px 0px;
  color: #767676;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled(Text)`
  font-size: 16px;
  color: #000;
  font-weight: 500;
`;

const LikeInner = styled.button`
  height: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin: 8px 12px;
`;

const Count = styled.span`
  font-size: 12px;
  margin-left: 6px;
  color: #767676;
`;

export default CafeCard;