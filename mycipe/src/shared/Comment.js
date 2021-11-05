import React from "react";
import styled from "styled-components";

// elements
import Image from "../elements/Image";
// icon
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as SmallLikeIcon } from "../assets/icon/LikeIcon/smallLike.svg";
import { ReactComponent as ActiveSmallLikeIcon } from "../assets/icon/LikeIcon/activeSmallLike.svg";

const Comment = () => {
  return (
    <>
      <Box directionCol>
        <Box width="320">
          <CommentItem>
            <Image shape="circle" size="small" src="" />

            <Box center directionCol margin="0px 0px 0px 12px">
              <Box margin="0px 0px 4px 0px" height="20">
                <Nickname>레시피 화이팅</Nickname>
                <Date>1시간 전</Date>
              </Box>

              <Box width="270" margin="0px 0px 8px 0px" cmtSize>
                맛있어보입니다~~~~맛있어보입니다~~~~맛있어보입니다~~~~
                맛있어보입니다~~~~맛있어보입니다~~~~맛있어보입니다~~~~맛있어보입니다~~~~
                맛있어보입니다~~~~
              </Box>

              <Box width="270">
                <SmallLikeIcon />
                <LikeCount>111개</LikeCount>
                <MenuIcon />
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
  justify-content: space-between;
  margin: ${(props) => props.margin};
  ${(props) => props.width && `width : ${props.width}px;`}
  ${(props) => props.height && `height : ${props.height}px;`}
  ${(props) => props.directionCol && `flex-direction : column;`}
  ${(props) => props.center && `align-items: center;`}
  ${(props) => props.cmtSize && `font-size : 12px; color: #191919;`}
`;

const TextInputBox = styled.textarea`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.marginBtm}px;
  padding: 15px 16px;
  background: #f8f8fa;
  border-radius: 6px;

  /* Chrome/Opera/Safari */
  ::-webkit-input-placeholder {
    color: #999999;
  }
  /* Firefox 19+ */
  ::-moz-placeholder {
    color: #999999;
  }
  /* IE 10+ */
  :-ms-input-placeholder {
    color: #999999;
  }
  /* Firefox 18- */
  :-moz-placeholder {
    color: #999999;
  }
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

export default Comment;
