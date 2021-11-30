import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

import {
  getRecommendCafeDB,
  getPopularWeekListDB,
  getPopularMonthListDB,
  getRecentListDB,
} from "../../redux/Async/mainPage";

import CafeCard from "../../components/Card/CafeCard";
import ModalBackground from "../../shared/ModalBackground";
import UserCard from "../../components/Card/UserCard";
import ImageSlider from "../../shared/ImageSlider";

import Header from "../../shared/Header";
import BottomNav from "../../shared/BottomNav";

import likeKing from "../../assets/image/banner/likeKing.svg";
import commentKing from "../../assets/image/banner/commentKing.svg";
import writeKing from "../../assets/image/banner/writeKing.svg";
import followerKing from "../../assets/image/banner/followerKing.svg";

import { ReactComponent as LogoIcon } from "../../assets/icon/HeaderIcon/logo.svg";
import { ReactComponent as SmallFeedBackCafeIcon } from "../../assets/icon/smallFeedBackCafeIcon.svg";
import { ReactComponent as CoachMarkIcon } from "../../assets/icon/coachmark.svg";

import { mainApi } from "../../shared/api/mainApi";

// 날짜 라이브러리
import dayjs from "dayjs";
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

  // 일 - 토 순으로 디데이 카운트 배열
  const dDayArr = [1, 7, 6, 5, 4, 3, 2];

  // get("d")를 하면 현재 시간의 요일을 숫자로 받아온다. 일-토 : 0-6
  const [date, setDate] = useState(dayjs().get("d"));
  const [dDay, setDday] = useState(0);

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
    });

    dispatch(getPopularWeekListDB());
    dispatch(getRecentListDB());
    dispatch(getRecommendCafeDB());

    fetchData();

    // 페이지 렌더링 될 때마다 현재 시간으로 요일을 업데이트.
    setDate(dayjs().get("d"));
    setDday(dDayArr[date]);
  }, []);

  // 0 : 좋아요왕 , 1 : 게시글왕 , 2: 팔로우왕 , 3:댓글왕
  const [rankCategory, setRankCategory] = useState(0);

  // 배너에 보여줄 정보
  const bannerList = [
    {
      img: likeKing,
      title: "좋아요",
      kinginfo: kingList.getLikeKing,
      fontColor: "#ffffff",
    },
    {
      img: writeKing,
      title: "게시물",
      kinginfo: kingList.getPostKing,
      fontColor: "#767676",
    },
    {
      img: followerKing,
      title: "팔로워",
      kinginfo: kingList.getFollowKing,
      fontColor: "#767676",
    },
    {
      img: commentKing,
      title: "댓글",
      kinginfo: kingList.getCommentKing,
      fontColor: "#ffffff",
    },
  ];

  return (
    <>
      <Header />
      <MainInner>
        <ImageSlider bannerList={bannerList} isBanner />
        {isActive && <ModalBackground />}
        {/* 추천 카페 */}
        <Banner isflex>
          <BannerTitle>추천 카페 후기</BannerTitle>
        </Banner>
        <CafeCardList>
          {commendList.map((c, idx) => {
            return (
              <CafeCard
                _onClick={() => {
                  history.push(`/cafeboard/detail/${c.cafeId}`);
                }}
                key={c.cafeId}
                image={c.image}
                {...c}
              />
            );
          })}
        </CafeCardList>

        {/* 왕 후보 */}
        <RankingInner>
          <Banner>
            <BannerTitle>누가 왕이 될 상인가</BannerTitle>
            <Date>마감 D-{dDay}</Date>
          </Banner>

          <RankingButtonInner>
            <RankingButton
              isActive={rankCategory === 0 ? true : false}
              onClick={() => {
                setRankCategory(0);
              }}
            >
              좋아요왕
            </RankingButton>
            <RankingButton
              isActive={rankCategory === 1 ? true : false}
              onClick={() => {
                setRankCategory(1);
              }}
            >
              게시물왕
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
        <Banner isflex>
          <BannerTitle>인기 카페 후기</BannerTitle>

          <BannerButtonInner>
            <BannerDateButton
              color={category.weekly ? true : false}
              backgroundColor={category.weekly ? true : false}
              border={category.weekly ? true : false}
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
              border={category.monthly ? true : false}
              onClick={() => {
                setCategory({ weekly: false, monthly: true });
                dispatch(getPopularMonthListDB());
              }}
            >
              월간
            </BannerDateButton>
          </BannerButtonInner>
        </Banner>

        <CafeCardList marginBottom>
          {popularList.map((m, idx) => {
            return (
              <CafeCard
                _onClick={() => {
                  history.push(`/cafeboard/detail/${m.cafeId}`);
                }}
                key={m.cafeId}
                image={m.image}
                {...m}
              />
            );
          })}
        </CafeCardList>

        {/* 최근 카페 */}
        <Banner isflex>
          <BannerTitle>최근 카페 후기</BannerTitle>
          <BannerMoreButton
            onClick={() => {
              history.push("/cafeboard");
            }}
          >
            더보기
          </BannerMoreButton>
        </Banner>

        <CafeCardList>
          {recentList.map((m, idx) => {
            return (
              <CafeCard
                _onClick={() => {
                  history.push(`/cafeboard/detail/${m.cafeId}`);
                }}
                key={m.cafeId}
                image={m.image}
                {...m}
              />
            );
          })}
        </CafeCardList>
      </MainInner>

      <Contact>
        <ContactInner>
          <LogoIcon />
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
            <ContactText>
              ⓒ 2021. Project cafewang All rights reserved
            </ContactText>
          </ContactBox>
        </ContactInner>
      </Contact>

      <FloatButton
        href="https://forms.gle/hhrYTh9eFxB3ZfYH9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ButtonSmall>
          <Box>
            <CoachMarkIcon />
          </Box>
          <SmallFeedBackCafeIcon />
        </ButtonSmall>
      </FloatButton>
      <BottomNav />
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
  margin: 56px 0 4px 0;

  ${(props) =>
    props.isflex &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}
`;

const BannerTitle = styled.span`
  font-size: 16px;
  font-family: "Pretendard-Medium";
`;

const BannerButtonInner = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
`;

const RankingButtonInner = styled.div`
  display: flex;
  margin-top: 4px;
  justify-content: space-between;
`;

const BannerDateButton = styled.button`
  width: 60px;
  height: 24px;

  font-size: 14px;
  font-family: "Pretendard-Medium";
  color: ${(props) => (props.color ? "#fff" : "#767676")};
  background-color: ${(props) => (props.backgroundColor ? "#191919" : "#fff")};
  border: ${(props) => (props.border ? "1px solid #000" : "1px solid #999999")};
`;

const RankingButton = styled(BannerDateButton)`
  padding: 4px 8px;
  width: 80px;
  height: 28px;
  font-family: "Pretendard-Medium";

  ${(props) =>
    props.isActive &&
    css`
      color: #fff;
      background-color: #191919;
      border: 1px solid #000;
    `};
`;

const BannerMoreButton = styled.button`
  font-size: 12px;
  color: #999;
  font-family: "Pretendard-Regular";
`;

const CafeCardList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Contact = styled.div`
  margin-top: 80px;
  margin-bottom: 20px;
  border-top: solid 1px #ededed;
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
  color: #ff7a7a;
`;

const FloatButton = styled.a`
  position: fixed;
  right: -17%;
  bottom: 70px;
  z-index: 100;

  display: flex;

  @media only screen and (min-width: 380px) and (max-width: 720px) {
    /* top: 73%; */
  }
`;

const ButtonSmall = styled.div`
  @media only screen and (min-width: 720px) {
    display: none;
  }
`;

const Box = styled.div`
  position: relative;
  right: 60%;
`;

const UserListContainer = styled.ul`
  margin-top: 8px;
`;

const Date = styled.span`
  color: #767676;
  font-size: 14px;
  margin-left: 8px;
  font-family: "Pretendard-Regular";
`;

export default Main;
