import React from "react";
import styled from "styled-components";

// elements
import Image from "../../elements/Image";
// icon
import { ReactComponent as SmallLikeIcon } from "../../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLikeIcon } from "../../assets/icon/LikeIcon/activeSmallLike.svg";

const BoardComment = () => {
  return (
    <>
      <Box directionCol>
        <Box width="320">
          <CommentItem>
            <Image shape="circle" size="small" src="" />

            <Box width="270" verCenter col margin="0px 0px 0px 12px">
              <Box margin="0px 0px 4px 0px" height="20">
                <Nickname>레시피 화이팅</Nickname>
                <Date>1시간 전</Date>
              </Box>

              <Box width="270" margin="0px 0px 8px 0px" cmtSize>
                맛있어보입니다~~~~맛있어보입니다~~~~맛있어보입니다~~~~
                맛있어보입니다~~~~맛있어보입니다~~~~맛있어보입니다~~~~맛있어보입니다~~~~
                맛있어보입니다~~~~
              </Box>

              <Box width="270" horCenter>
                <SmallLikeIcon />
                <LikeCount>111개</LikeCount>
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
