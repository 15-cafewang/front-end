import React from "react";
import styled from "styled-components";

// icon
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import { ReactComponent as ActiveSmallLikeIcon } from "../../assets/icon/LikeIcon/activeSmallLike.svg";
// elements
import Image from "../../elements/Image";
// components
import Comment from "../../shared/Comment";
import ImageSlider from "../../shared/ImageSlider";

const BoardDetail = ({ boardName }) => {
  // 임시 정적 데이터
  const src =
    "https://post-phinf.pstatic.net/MjAxOTA4MjZfNDEg/MDAxNTY2ODExNTY1Nzkw.-BwndCmYDw-hO4Iy8u1Ur1IepIiFV33a1OGCJs3qsLog.ZQwcf3pHihVe1oSGBPyFs8Dtrz3bLr1N_Xkf2ZKWlT4g.JPEG/0.jpg?type=w1200";
  const userHashTagList = ["#달달한", "#당충전", "#아이스", "#시험기간에 필수"];
  const title = "스타벅스 돼지바 프라푸치노";
  const price = "얼마니??";
  const content =
    "초코 드리즐 + 휘핑크림 + 자바칩과 함께 갈기 + 딸기시럽 6펌프 + 두유 딸기 프라푸치노";

  return (
    <>
      <BoardDetailContainer>
        <Box margin="0px 0px 16px 0px">
          <Image shape="circle" size="small" src="" />
          <Nickname>내시피 화이팅</Nickname>
          <MenuIcon />
        </Box>

        {/* <ImageSlider src={src} /> */}
        <Image shape="rectangle" size="large" src={src} />

        {/* ----------------------------------- */}
        {/* 사용자가 올린 해시태그 목록 : 레시피 상세일 때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <HashTagBox>
            {userHashTagList.map((tag) => {
              return <UserHashTagItem key={tag}>{tag}</UserHashTagItem>;
            })}
          </HashTagBox>
        )}

        <TextInputBox width="320" height="48" marginBtm="8" value={title} />

        {/* ------------------------------------ */}
        {/* 가격 정보 : 레시피 상세페이지 일때만 렌더링 */}
        {boardName === "recipeBoard" && (
          <TextInputBox width="320" height="48" marginBtm="8" value={price} />
        )}

        <TextInputBox width="320" height="240" value={content} />

        <Box width="320" margin="12px 0px 56px 0px">
          <ActiveSmallLikeIcon />
          <LikeCount>111개</LikeCount>
          <Date>2021. 11. 05</Date>
        </Box>

        <Box width="320" margin="0px 0px 20px 0px">
          <TextInputBox
            width="262"
            height="50"
            placeholder="댓글을 입력해 주세요."
          />
          <Button>등록</Button>
        </Box>

        <Comment />
        <Comment />
        <Comment />
      </BoardDetailContainer>
    </>
  );
};

const BoardDetailContainer = styled.div`
  height: 100%;
  margin: 20px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  ${(props) => props.width && `width : ${props.width}px;`}
  margin: ${(props) => props.margin};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.div`
  margin-left: 8px;
  width: 250px;
  font-size: 14px;
`;

const HashTagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 320px;
`;

const UserHashTagItem = styled.div`
  height: 36px;
  padding: 8px 10px;
  margin: 0px 8px 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.active ? `1px solid #7692E4` : `1px solid #dbdbdb`};
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => (props.active ? `#ffffff` : `#767676`)};
  background-color: ${(props) => (props.active ? `#7692E4` : `#ffffff`)};
  cursor: pointer;
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

const LikeCount = styled.div`
  font-size: 12px;
  color: #767676;
  width: 220px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #767676;
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #767676;
  background-color: #ffffff;
`;

export default BoardDetail;
