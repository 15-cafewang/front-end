import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

// elements
import Image from "../../elements/Image";
// icon
import { ReactComponent as SmallLike } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLike } from "../../assets/icon/LikeIcon/activeSmallLike.svg";

// 날짜 라이브러리
import dayjs from "dayjs";
// 작성일 표시 라이브러리
import TimeCounting from "time-counting";

const BoardComment = ({
  content,
  likeCount,
  likeStatus,
  nickname,
  profileImage,
  _onClick,
  regDate,
}) => {
  const timeOption = {
    lang: "ko",
    objectTime: dayjs().format(`YYYY/MM/DD HH:mm:ss`),
    calculate: {
      justNow: 61,
      //60 초전까지만 조금전 표시
    },
  };
  return (
    <>
      <Box directionCol>
        <Box width="320">
          <CommentItem onClick={_onClick}>
            <Image
              shape="circle"
              size="small"
              src={profileImage}
              _onClick={() => {
                history.push(`/usermain/${nickname}`);
              }}
            />

            <Box width="270" verCenter col margin="0px 0px 0px 12px">
              <Box margin="0px 0px 4px 0px" height="20">
                <Nickname>{nickname}</Nickname>
                <Date> {TimeCounting(regDate, timeOption)}</Date>
              </Box>

              <Box width="270" margin="0px 0px 8px 0px" cmtSize>
                {content}
              </Box>

              <Box width="270" horCenter>
                {likeStatus ? <ActiveSmallLike /> : <SmallLike />}
                <LikeCount>{likeCount}개</LikeCount>
              </Box>
            </Box>
          </CommentItem>
        </Box>
      </Box>
    </>
  );
};

const Box = styled.div`
  display: flex;
  margin: ${(props) => props.margin};
  ${(props) => props.width && `width : ${props.width}px;`}
  ${(props) => props.height && `height : ${props.height}px;`}
  ${(props) =>
    props.col && `flex-direction : column; justify-content : flex-end;`}
  ${(props) => props.verCenter && `align-items: center;`}
  ${(props) => props.horCenter && `justify-content: space-between;`}
  ${(props) => props.cmtSize && `font-size : 12px; color: #191919;`}
`;

const CommentItem = styled.div`
  margin: 0px 0px 20px 0px;
  display: flex;
  justify-content: space-between;
`;

const Nickname = styled.div`
  margin: 0px 8px 0px 0px;
  width: 230px;
  font-size: 14px;
  color: #191919;
`;

const Date = styled.div`
  font-size: 10px;
  color: #999999;
`;

const LikeCount = styled.div`
  font-size: 12px;
  color: #767676;
  width: 220px;
`;

export default BoardComment;