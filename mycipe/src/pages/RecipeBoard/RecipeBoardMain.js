import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import RecipeCard from "../../components/Card/RecipeCard";
import ModalBackground from "../../shared/ModalBackground";
import { getRecipePostListDB } from "../../redux/Async/recipeBoard";
import { history } from "../../redux/configureStore";

const RecipeBoardMain = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const recipeList = useSelector(
    (state) => state.recipeBoard && state.recipeBoard.recipeList
  );

  useEffect(() => {
    dispatch(getRecipePostListDB());
  }, []);

  return (
    <>
      <BoardMainContainer>
        {isActive && <ModalBackground />}
        {/* 정렬 박스 */}
        <SortingBox>
          <SortingItem>최신순</SortingItem>
          <SortingItem>인기순</SortingItem>
        </SortingBox>
        {/* commentCount: 0 content: "dd" images: [] likeCount: 0 likeStatus: false
        nickname: "박하린" price: 22 recipeId: 46 regdate:
        "2021-11-09T18:08:32.114896" title: "dd" */}
        <CardList>
          {recipeList &&
            recipeList.map((r, idx) => {
              return (
                <RecipeCard
                  _onClick={() => {
                    history.push(`/recipeboard/detail/${r.recipeId}`);
                  }}
                  key={r.recipeId}
                  commentCount={r.commentCount}
                  content={r.content}
                  image={r.images[0]}
                  likeCount={r.likeCount}
                  likeStatus={r.likeStatus}
                  nickname={r.nickname}
                  price={r.price}
                  regDate={r.regdate
                    .split("T")[0]
                    .replace("-", ". ")
                    .replace("-", ". ")}
                  title={r.title}
                />
              );
            })}
        </CardList>
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  padding: 12px 20px 10px;
  position: relative;
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
