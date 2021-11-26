import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

import {
  getRecommendCafeDB,
  getPopularWeekListDB,
  getPopularMonthListDB,
  getRecentListDB,
} from "../../redux/Async/mainPage";

import RecipeCard from "../../components/Card/RecipeCard";
import ModalBackground from "../../shared/ModalBackground";

import UserCard from "../../components/Card/UserCard";
import ImageSlider from "../../shared/ImageSlider";

import likeKing from "../../assets/image/banner/likeKing.svg";
import commentKing from "../../assets/image/banner/commentKing.svg";
import writeKing from "../../assets/image/banner/writeKing.svg";
import followerKing from "../../assets/image/banner/followerKing.svg";

import { ReactComponent as ContactImage } from "../../assets/icon/HeaderIcon/logo.svg";

import { mainApi } from "../../shared/api/mainApi";

const Main = (props) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const commendList = useSelector((state) => state.mainPage.commendList);
  const popularList = useSelector((state) => state.mainPage.popularList);
  const recentList = useSelector((state) => state.mainPage.recentList);

  const [category, setCategory] = useState({
    weekly: true,
    monthly: false,
  });

  const [rankList, setRankList] = useState([]);
  const [kingList, setKingList] = useState([]);

  async function fetchData() {
    try {
      const rankListResponse = mainApi.getRankList();

      const kingListResponse = mainApi.getKingList();
      const getRankList = (await rankListResponse).data.data;
      const getKingList = (await kingListResponse).data.data;

      setRankList(getRankList);
      setKingList(getKingList);
    } catch (error) {
      console.log(error.data.error);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getPopularWeekListDB());
    dispatch(getRecentListDB());
    dispatch(getRecommendCafeDB());

    fetchData();
  }, []);

  // 0 : 좋아요왕 , 1 : 게시글왕 , 2: 팔로우왕 , 3:댓글왕
  const [rankCategory, setRankCategory] = useState(0);

  // 배너에 보여줄 정보
  const bannerList = [
    { img: writeKing, title: "게시물", kinginfo: kingList.gePostKing },
    { img: likeKing, title: "좋아요", kinginfo: kingList.getLikeKing },
    { img: followerKing, title: "팔로워", kinginfo: kingList.geFollowKing },
    { img: commentKing, title: "댓글", kinginfo: kingList.getCommentKing },
  ];

  console.log(bannerList);

  return (
    <>
      <ImageSlider bannerList={bannerList} isBanner />
      <MainInner>
        {isActive && <ModalBackground />}
        {/* 추천 카페 */}
        <Banner>
          <BannerTitle>추천 카페</BannerTitle>
        </Banner>

        <RecipeCardList>
          {commendList.map((c, idx) => {
            return (
              <RecipeCard
                _onClick={() => {
                  history.push(`/recipeboard/detail/${c.recipeId}`);
                }}
                key={c.recipeId}
                image={c.images[0]}
                {...c}
              />
            );
          })}
        </RecipeCardList>

        {/* 왕 후보 */}
        <RankingInner>
          <Banner>
            <BannerTitle>누가 왕이 될 상인가</BannerTitle>
          </Banner>

          <RankingButtonInner>
            <RankingButton
              isActive={rankCategory === 0 ? true : false}
              onClick={() => {
                setRankCategory(0);
              }}
            >
              게시물왕
            </RankingButton>
            <RankingButton
              isActive={rankCategory === 1 ? true : false}
              onClick={() => {
                setRankCategory(1);
              }}
            >
              좋아요왕
            </RankingButton>
            <RankingButton
              isActive={rankCategory === 2 ? true : false}
              onClick={() => {
                setRankCategory(2);
              }}
            >
              팔로워왕
            </RankingButton>
            <RankingButton
              isActive={rankCategory === 3 ? true : false}
              onClick={() => {
                setRankCategory(3);
              }}
            >
              댓글왕
            </RankingButton>
          </RankingButtonInner>

          <UserListContainer>
            {rankList[rankCategory]?.map((user, idx) => {
              return (
                <UserCard
                  key={idx}
                  isrank={true}
                  {...user}
                  rank={idx + 1}
                  category={bannerList[rankCategory].title}
                />
              );
            })}
          </UserListContainer>
        </RankingInner>

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
                image={m.images[0]}
                {...m}
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
                image={m.images[0]}
                {...m}
              />
            );
          })}
        </RecipeCardList>
      </MainInner>

      <Contact>
        <ContactInner>
          <ContactImage />
          <ContactBox>
            <ContactText>
              팀원소개 <A>Notion</A> &nbsp;&nbsp;|&nbsp;&nbsp; 프로젝트 &nbsp;
              <A
                href="https://github.com/99-final-project"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </A>
            </ContactText>
          </ContactBox>
          <ContactBox>
            <ContactText>ⓒ 2021. Project ecafe All rights reserved</ContactText>
          </ContactBox>
        </ContactInner>
      </Contact>
    </>
  );
};

const MainInner = styled.div`
  height: auto;

  padding: 0px 20px;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const RankingInner = styled(MainInner)`
  padding: 0px;
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
  width: 250px;
  display: flex;
  justify-content: flex-end;
`;

const RankingButtonInner = styled.div`
  display: flex;
  margin-top: 4px;

  & :nth-child(1) {
    margin-left: 0px;
  }
`;

const BannerDateButton = styled.button`
  width: 53px;
  height: 28px;

  margin-left: 5px;
  font-size: 14px;
  padding: 0px 12px;

  color: ${(props) => (props.color ? "#fff" : "#767676")};
  background-color: ${(props) => (props.backgroundColor ? "#191919" : "#fff")};
  border: 1px solid #999999;
`;

const RankingButton = styled(BannerDateButton)`
  padding: 4px 8px;
  width: 67px;
  height: 28px;

  ${(props) =>
    props.isActive &&
    css`
      color: #fff;
      background-color: #191919;
    `};
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
const Contact = styled.div`
  margin-top: 50px;
  border-top: solid 1px gray;
  padding: 20px 0px 0px 0px !important;
  position: relative;
`;
const ContactInner = styled.div`
  padding: 0px 20px;
`;

const ContactBox = styled.div``;

const ContactText = styled.span`
  font-size: 10px;
`;

const A = styled.a`
  color: #7692e4;
`;

const UserListContainer = styled.ul`
  margin-top: 8px;
`;

export default Main;
