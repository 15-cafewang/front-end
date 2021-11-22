import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import {
  getPopularWeekListDB,
  getPopularMonthListDB,
  getRecentListDB,
} from "../../redux/Async/mainPage";

import RecipeCard from "../../components/Card/RecipeCard";
import ModalBackground from "../../shared/ModalBackground";

const Main = (props) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const popularList = useSelector((state) => state.mainPage.popularList);
  const recentList = useSelector((state) => state.mainPage.recentList);
  const [category, setCategory] = useState({
    weekly: true,
    monthly: false,
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(getPopularWeekListDB());
    dispatch(getRecentListDB());
  }, []);

  return (
    <MainInner>
      {isActive && <ModalBackground />}
      {/* 인기 카페 */}
      <Banner>
        <BannerTitle>인기 카페</BannerTitle>

        <BannerButtonInner>
          <BannerDateButton
            color={category.weekly ? true : false}
            backgroundColor={category.weekly ? true : false}
            onClick={() => {
              setCategory({ weekly: true, monthly: false });
              dispatch(getPopularWeekListDB());
            }}
          >
            주간
          </BannerDateButton>
          <BannerDateButton
            color={category.monthly ? true : false}
            backgroundColor={category.monthly ? true : false}
            onClick={() => {
              setCategory({ weekly: false, monthly: true });
              dispatch(getPopularMonthListDB());
            }}
          >
            월간
          </BannerDateButton>
        </BannerButtonInner>
      </Banner>

      <RecipeCardList marginBottom>
        {popularList.map((m, idx) => {
          return (
            <RecipeCard
              _onClick={() => {
                history.push(`/recipeboard/detail/${m.recipeId}`);
              }}
              key={m.recipeId}
              commentCount={m.commentCount}
              content={m.content}
              image={m.images[0]}
              likeCount={m.likeCount}
              likeStatus={m.likeStatus}
              nickname={m.nickname}
              price={m.price}
              regDate={
                m.regdate
                  ? m.regdate
                      .split("T")[0]
                      .replace("-", ". ")
                      .replace("-", ". ")
                  : ""
              }
              title={m.title}
            />
          );
        })}
      </RecipeCardList>

      {/* 최근 카페 */}
      <Banner>
        <BannerTitle>최근 카페</BannerTitle>
        <BannerMoreButton
          onClick={() => {
            history.push("/recipeboard");
          }}
        >
          더보기
        </BannerMoreButton>
      </Banner>

      <RecipeCardList>
        {recentList.map((m, idx) => {
          return (
            <RecipeCard
              _onClick={() => {
                history.push(`/recipeboard/detail/${m.recipeId}`);
              }}
              key={m.recipeId}
              commentCount={m.commentCount}
              content={m.content}
              image={m.images[0]}
              likeCount={m.likeCount}
              likeStatus={m.likeStatus}
              nickname={m.nickname}
              price={m.price}
              regDate={
                m.regdate
                  ? m.regdate
                      .split("T")[0]
                      .replace("-", ". ")
                      .replace("-", ". ")
                  : ""
              }
              title={m.title}
            />
          );
        })}
        {/* <RecipeCard />
        <RecipeCard />
        <RecipeCard /> */}
      </RecipeCardList>
    </MainInner>
  );
};

const MainInner = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  padding: 0px 20px;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Banner = styled.div`
  margin: 32px 6px 4px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BannerTitle = styled.span`
  font-size: 16px;
`;

const BannerButtonInner = styled.div`
  width: 166px;
  display: flex;
  justify-content: flex-end;
`;

const BannerDateButton = styled.button`
  width: 70px;
  height: 24px;
  border-radius: 50px;
  margin-left: 5px;
  font-size: 14px;
  padding: 0px 12px;

  color: ${(props) => (props.color ? "#fff" : "#767676")};
  background-color: ${(props) =>
    props.backgroundColor ? "#7692e4" : "#dbdbdb"};

  /* ${(props) =>
    props.active &&
    css`
      color: #fff;
      background-color: #7692e4;
    `}; */
`;

const BannerMoreButton = styled.button`
  font-size: 12px;
  color: #999;
`;

const RecipeCardList = styled.ul`
  margin-bottom: ${(props) => props.marginBottom && "56px"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Main;
