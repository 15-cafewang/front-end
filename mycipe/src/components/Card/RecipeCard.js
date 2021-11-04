import React from "react";
import styled from "styled-components";

import { ReactComponent as SmallLike } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLike } from "../../assets/icon/LikeIcon/activeSmallLike.svg";

const RecipeCard = (props) => {
  return (
    <RecipeCardInner>
      {/* 기본 테두리 해결못함.. */}
      <CardTumbnail src="" />

      <CardContent>
        <TextInner>
          <Title>
            제목이 들어갈 자리 제목이들어갈자리제목이 들어갈 자리
            제목이들어갈자리
          </Title>
          <Text>작성자</Text>
          <Text>1,500원</Text>
        </TextInner>

        <LikeInner>
          <ActiveSmallLike />
          {/* <SmallLike /> */}
          <Count>10개</Count>
        </LikeInner>
      </CardContent>
    </RecipeCardInner>
  );
};

const RecipeCardInner = styled.li`
  height: 112px;
  display: flex;
  margin: 12px 0px;
  width: 320px;
  border-top: 1px solod black;
`;

const CardTumbnail = styled.img`
  /* background-image: url(""); */
  background-position: center;
  background-size: cover;

  border-radius: 6px 0px 0px 6px;
  width: 112px;
  background: red;
`;

const CardContent = styled.div`
  background: #f8f8fa;
  border-radius: 0px 6px 6px 0px;
  width: 208px;
`;

const TextInner = styled.div`
  margin: 12px 12px 0px 12px;
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
  margin: 8px 12px;
`;

const Count = styled.span`
  font-size: 12px;
  margin-left: 6px;
  color: #767676;
`;

export default RecipeCard;
