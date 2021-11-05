import React from "react";
import styled from "styled-components";

import { ButtonInner, SmallFilterButton } from "../../elements/index";
import RecipeCard from "../../components/Card/RecipeCard";
const SearchList = (props) => {
  return (
    <>
      <SelectedHashTagInner>
        <HashTagItem active>#청량한</HashTagItem>
        <HashTagItem active>#고소한</HashTagItem>
        <HashTagItem active>#고소한</HashTagItem>
        <HashTagItem active>#고소한</HashTagItem>
        <HashTagItem active>#고소한</HashTagItem>
        <HashTagItem active>#고소한</HashTagItem>
        <HashTagItem active>#고소한</HashTagItem>
      </SelectedHashTagInner>

      <ButtonInner small>
        <SmallFilterButton active>최신순</SmallFilterButton>
        <SmallFilterButton>인기순</SmallFilterButton>
      </ButtonInner>

      <SearchListInner>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </SearchListInner>
    </>
  );
};

const SearchListInner = styled.div`
  margin: 20px;
`;

const SelectedHashTagInner = styled.div`
  display: flex;
  margin: 12px 0px 20px 0px;
  overflow: auto;
  white-space: nowrap;

  // 스크롤 숨김
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HashTagItem = styled.div`
  width: 100px;
  height: 36px;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  margin-right: 8px;
  border: ${(props) =>
    props.active ? `1px solid #7692E4` : `1px solid #dbdbdb`};
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => (props.active ? `#ffffff` : `#767676`)};
  background-color: ${(props) => (props.active ? `#7692E4` : `#ffffff`)};
  cursor: pointer;
`;

export default SearchList;
