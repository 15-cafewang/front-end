import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
// icons
import { ReactComponent as SmallLike } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as CommentMiniIcon } from "../../assets/icon/CommmentIcon/commentMini.svg";
import { ReactComponent as ActiveSmallLike } from "../../assets/icon/LikeIcon/activeSmallLike.svg";

import likeCrown from "../../assets/icon/CrownIcon/likeCrown.svg";
import postCrown from "../../assets/icon/CrownIcon/postCrown.svg";
import followerCrown from "../../assets/icon/CrownIcon/followerCrown.svg";
import commentCrown from "../../assets/icon/CrownIcon/commentCrown.svg";

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
  rankingStatus = 0,
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

  let crownImage = "";
  if (rankingStatus === 1) crownImage = likeCrown;
  else if (rankingStatus === 2) crownImage = postCrown;
  else if (rankingStatus === 3) crownImage = followerCrown;
  else if (rankingStatus === 4) crownImage = commentCrown;
  else crownImage = "";

  return (
    <CafeCardInner onClick={_onClick}>
      <Image shape="rectangle" src={isImage} size="medium" border />
      <CardContent>
        <TextInner>
          <Grid>
            <Title>{title}</Title>
            {rankingStatus !== 0 && <CrownImage src={crownImage} alt="왕관" />}
          </Grid>
          <Text>{nickname}</Text>
          <Text>{location}</Text>
        </TextInner>
        <IconsInner>
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
          <CommentInner>
            <CommentMiniIcon />
            <Count>{commentCount}개</Count>
          </CommentInner>
        </IconsInner>
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
  width: 100%;

  cursor: pointer;
`;

const CardContent = styled.div`
  background: #f8f8fa;
  border: 1px solid #767676;
  width: 65%;
`;

const TextInner = styled.div`
  margin: 12px 12px 0px;
`;

const Text = styled.p`
  font-size: 12px;
  margin-bottom: 1px;
  color: #767676;
  font-family: "Pretendard-Regular";

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled(Text)`
  font-size: 16px;
  color: #000;
  font-weight: 500;
  font-family: "Pretendard-Medium";
`;

const IconsInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 6px 12px 12px;
  font-size: 16px;
  height: 16px;
`;

const LikeInner = styled.button`
  display: flex;
  flex-direction: row;
  margin-right: 4px;
`;

const CommentInner = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

const Count = styled.span`
  font-size: 12px;
  height: 16px;
  margin-left: 6px;
  color: #767676;
  padding: 2px 0px 2px 0px;
`;

const CrownImage = styled.img`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export default CafeCard;
