import React from "react";
import styled from "styled-components";

import RecipeCard from "../../components/Card/RecipeCard";
import BoardCard from "../Card/BoardCard";

const RecipeBoardMain = ({ boardName }) => {
  const src =
    "https://blog.kakaocdn.net/dn/GxTdx/btqPdTdEFKR/s1TX9oAjx6PErwJb13pKl0/img.jpg";

  return (
    <>
      <BoardMainContainer>
        {/* 정렬 박스 */}
        <SortingBox>
          <SortingItem>최신순</SortingItem>
          <SortingItem>인기순</SortingItem>
        </SortingBox>

        {boardName === "recipeBoard" && (
          <CardList>
            <RecipeCard src={src} />
            <RecipeCard src={src} />
            <RecipeCard src={src} />
            <RecipeCard src={src} />
            <RecipeCard src={src} />
          </CardList>
        )}

        {boardName === "bulletinBoard" && (
          <CardList>
            <BoardCard />
            <BoardCard src={src} />
            <BoardCard />
            <BoardCard />
            <BoardCard />
          </CardList>
        )}
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: 100%;
  margin: 12px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SortingBox = styled.div`
  height: 32px;
  display: flex;
  position: relative;
  left: 120px;
`;

const SortingItem = styled.div`
  margin: 0px 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #767676;
`;

const CardList = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RecipeBoardMain;
