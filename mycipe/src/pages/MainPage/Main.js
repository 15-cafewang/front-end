import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";

import RecipeCard from "../../components/Card/RecipeCard";

const Main = (props) => {
  const [category, setCategory] = useState({
    daily: false,
    weekly: false,
    monthly: false,
  });

  console.log(category);
  return (
    <MainInner>
      {/* 인기 레시피 */}
      <Banner>
        <BannerTitle>인기레시피</BannerTitle>

        <BannerButtonInner>
          <BannerDateButton
            color={category.daily ? true : false}
            backgroundColor={category.daily ? true : false}
            onClick={() => {
              setCategory({ daily: true, weekly: false, monthly: false });
            }}
          >
            일간
          </BannerDateButton>
          <BannerDateButton
            color={category.weekly ? true : false}
            backgroundColor={category.weekly ? true : false}
            onClick={() => {
              setCategory({ daily: false, weekly: true, monthly: false });
            }}
          >
            주간
          </BannerDateButton>
          <BannerDateButton
            color={category.monthly ? true : false}
            backgroundColor={category.monthly ? true : false}
            onClick={() => {
              setCategory({ daily: false, weekly: false, monthly: true });
            }}
          >
            월간
          </BannerDateButton>
        </BannerButtonInner>
      </Banner>

      <RecipeCardList marginBottom>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </RecipeCardList>

      {/* 최근 레시피 */}
      <Banner>
        <BannerTitle>최근 레시피</BannerTitle>
        <BannerMoreButton onClick={() => {}}>더보기</BannerMoreButton>
      </Banner>

      <RecipeCardList>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </RecipeCardList>
    </MainInner>
  );
};

const MainInner = styled.div`
  margin: 0px 20px;
  /* width : 100% */
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Banner = styled.div`
  margin: 32px 0px 4px 0px;
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
  justify-content: space-between;
`;

const BannerDateButton = styled.button`
  width: 50px;
  height: 24px;
  border-radius: 50px;

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
