import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  return (
    <CardInner>
      <CardTumbnail />

      <CardContent>
        <Title>제목이 들어갈 자리 제목이들어갈자리</Title>
        <Registrant>작성자</Registrant>
        <Price>1000원</Price>

        <LikeInner>
          <FontAwesomeIcon icon={faHeart} />
          <Count>10개</Count>
        </LikeInner>
      </CardContent>
    </CardInner>
  );
};

const CardInner = styled.div`
  width: 327px;
  height: 112px;
  background-color: yellow;
  display: flex;
`;

const CardTumbnail = styled.img`
  background-image: url("https://static.hubzum.zumst.com/hubzum/2019/02/21/10/bedc4bd3d4b740e093d08ea5c1713b58.PNG");
  background-position: center;
  background-size: cover;

  width: 112px;
  height: 112px;
`;

const CardContent = styled.div`
  padding: 14px;
  width: 200px;
`;

const Title = styled.h1`
  font-size: 16px;
  margin-bottom: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Registrant = styled.h3`
  font-size: 14px;
`;

const Price = styled.h4`
  font-size: 12px;
`;

const LikeInner = styled.div`
  margin: 10px 0px;
  font-size: 16px;
`;

const Count = styled.span`
  font-size: 12px;
  margin-left: 6px;
`;

export default Card;
