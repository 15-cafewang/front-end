import React from "react";
import styled from "styled-components";

const HashTag = () => {
  return (
    <>
      <HashTagBox>
        <HashTagItemRow width="300px" margin="0px 0px 8px 0px">
          <HashTagItem>#청량한</HashTagItem>
          <HashTagItem>#고소한</HashTagItem>
          <HashTagItem>#단짠</HashTagItem>
          <HashTagItem>#디카페인</HashTagItem>
        </HashTagItemRow>

        <HashTagItemRow width="225px" margin="0px 0px 8px 0px">
          <HashTagItem>#달달한</HashTagItem>
          <HashTagItem>#아이스</HashTagItem>
          <HashTagItem>#따뜻한</HashTagItem>
        </HashTagItemRow>

        <HashTagItemRow width="300px">
          <HashTagItem>#새콤달콤한</HashTagItem>
          <HashTagItem>#시험기간에 필수</HashTagItem>
          <HashTagItem>#당충전</HashTagItem>
        </HashTagItemRow>
      </HashTagBox>
    </>
  );
};

const HashTagBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 302px;
  height: 124px;
`;

const HashTagItemRow = styled.div`
  ${(props) => (props.margin ? `margin : ${props.margin}` : "")};
  width: ${(props) => props.width};
  display: flex;
  justify-content: space-between;
`;

const HashTagItem = styled.div`
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
  font-size: 14px;
  color: #767676;
  cursor: pointer;
`;

export default HashTag;
