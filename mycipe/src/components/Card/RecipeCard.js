import React from "react";
import styled from "styled-components";

import { ReactComponent as SmallLike } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLike } from "../../assets/icon/LikeIcon/activeSmallLike.svg";
import Image from "../../elements/Image";

const RecipeCard = ({
  commentCount,
  content,
  image,
  likeCount,
  likeStatus,
  nickname,
  price,
  title,
  _onClick,
}) => {
  const isImage = image ? `${image}` : "";

  return (
    <RecipeCardInner onClick={_onClick}>
      <Image shape="rectangle" src={isImage} size="medium" />
      <CardContent>
        <TextInner>
          <Title>{title}</Title>
          <Text>{nickname}</Text>
          <Text>{price}원</Text>
        </TextInner>

        <LikeInner>
          {likeStatus ? <ActiveSmallLike /> : <SmallLike />}
          <Count>{likeCount}개</Count>
        </LikeInner>
      </CardContent>
    </RecipeCardInner>
  );
};

RecipeCard.defaultProps = {
  _onClick: () => {},
};

const RecipeCardInner = styled.li`
  height: 112px;
  display: flex;
  margin: 6px 0px;
  width: 320px;
`;

const CardContent = styled.div`
  background: #f8f8fa;
  border-radius: 0px 6px 6px 0px;
  width: 208px;
`;

const TextInner = styled.div`
  margin: 12px 19.5px 0px;
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

const LikeInner = styled.div`
  height: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin: 8px 14px;
`;

const Count = styled.span`
  font-size: 12px;
  margin-left: 6px;
  color: #767676;
`;

export default RecipeCard;
