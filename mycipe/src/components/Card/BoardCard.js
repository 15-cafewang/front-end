import React from "react";
import styled from "styled-components";

import { ReactComponent as CommentMiniIcon } from "../../assets/icon/CommmentIcon/commentMini.svg";
import { ReactComponent as LikeIcon } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveLikeIcon } from "../../assets/icon/LikeIcon/activeSmallLike.svg";

const BoardCard = (props) => {
  const date = "2021.06.16";
  const isThumbnail = true;

  return (
    <BoardCardInner>
      <TitleInner>
        <Title>
          제목이 들어감제목이 들어감제목이 들어감제목이 들어감제목이 들어감
          제목이 들어감제목이 들어감제목이 들어감제목이 들어감제목이 들어감
        </Title>
        <Date>{date}</Date>
      </TitleInner>

      <Content>
        텍스트가들어갑니다
        텍스트가들어갑니다텍스트가들어갑니다텍스트가들어갑니다텍스트가들어갑니다
        텍스트가들어갑니다텍스트가들어갑니다텍스트가들어갑니다텍스트가들어갑니다
      </Content>

      {/* 기본 테두리 해결못함.. */}
      {isThumbnail ? <BoardCardTumbnail /> : ""}

      <IconsInner>
        <LikeInner>
          {/* <LikeIcon />/ */}
          <ActiveLikeIcon />
          <Count>10개</Count>
        </LikeInner>

        <CommentInner>
          <CommentMiniIcon />
          <Count>10개</Count>
        </CommentInner>
      </IconsInner>
    </BoardCardInner>
  );
};

const BoardCardInner = styled.div`
  height: 80px;
  width: 320px;
  margin: 20px;
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

const LikeInner = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
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

const BoardCardTumbnail = styled.img`
  /* background-image: url(""); */
  background-position: center;
  background-size: cover;

  width: 100%;
  height: 230px;

  margin-top: 8px;
  border-radius: 6px;
`;

export default BoardCard;
