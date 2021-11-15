import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

import { SmallFilterButton, ButtonInner } from "../../elements";
import RecipeCard from "../../components/Card/RecipeCard";
import ModalBackground from "../../shared/ModalBackground";

import { getRecipePostListDB } from "../../redux/Async/recipeBoard";

const RecipeBoardMain = () => {
  const isLoading = useSelector((state) => state.recipeBoard.isFetching);
  // 무한스크롤
  const observer = IntersectionObserver();

  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const [currentSorting, setCurrentSorting] = useState({
    sortedByDate: true,
    sortedByLikes: false,
  });
  const recipeList = useSelector(
    (state) => state.recipeBoard && state.recipeBoard.recipeList
  );

  useEffect(() => {
    if (currentSorting.sortedByDate) {
      dispatch(getRecipePostListDB("sortBy=regDate&sortByLike=false"));
    } else {
      dispatch(getRecipePostListDB("sortBy=regDate&sortByLike=true"));
    }
  }, [currentSorting.sortedByDate, dispatch]);

  return (
    <>
      <BoardMainContainer>
        {isActive && <ModalBackground />}
        {/* 정렬 박스 */}
        <ButtonInner height="32px" small>
          <SmallFilterButton
            active={currentSorting.sortedByDate}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: true,
                sortedByLikes: false,
              });
            }}
          >
            최신순
          </SmallFilterButton>
          <SmallFilterButton
            active={currentSorting.sortedByLikes}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: false,
                sortedByLikes: true,
              });
            }}
          >
            인기순
          </SmallFilterButton>
        </ButtonInner>

        {/* 최신순 */}
        {currentSorting.sortedByDate && (
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
                    title={r.title}
                  />
                );
              })}
          </CardList>
        )}

        {/* 인기순 */}
        {currentSorting.sortedByLikes && (
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
                    title={r.title}
                  />
                );
              })}
          </CardList>
        )}
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  padding: 0px 20px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardList = styled.div`
  margin-top: px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RecipeBoardMain;
