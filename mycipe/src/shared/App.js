import React, { useEffect } from "react";

import "../index.css";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";
import PrivateRoute from "../auth/PrivateRoute";
import PublickRoute from "../auth/PublickRoute";

// icon
import { ReactComponent as FeedBackIcon } from "../assets/icon/feedBackIcon.svg";
import { ReactComponent as FeedBackCafeIcon } from "../assets/icon/feedBackCafeIcon.svg";

// pages
import Intro from "../pages/Auth/Intro";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import CafeBoardWrite from "../pages/CafeBoard/CafeBoardWrite";
import NotFound from "../pages/NotFound";

import Kakao from "../components/Kakao";
import CafeBoardMain from "../pages/CafeBoard/CafeBoardMain";
import CafeBoardDetail from "../pages/CafeBoard/CafeBoardDetail";
import BulletinBoardWrite from "../pages/BulletinBoard/BulletinBoardWrite";
import BulletinBoardMain from "../pages/BulletinBoard/BulletinBoardMain";
import BulletinBoardDetail from "../pages/BulletinBoard/BulletinBoardDetail";
import Main from "../pages/MainPage/Main";
import UserMain from "../pages/UserPage/UserMain";
import UserpageProfileEdit from "../pages/UserPage/UserProfileEdit";
import UserPageFollowList from "../pages/UserPage/UserFollowList";

import SearchMain from "../pages/SearchPage/SearchMain";
import Setting from "../pages/SettingPage/Setting";
import background from "../assets/image/background.png";

import { loginCheck } from "../redux/Async/user";

function App() {
  const dispatch = useDispatch();
  // 로컬 스토리지 토큰 확인
  const isToken = localStorage.getItem("USER_TOKEN") ? true : false;

  useEffect(() => {
    if (isToken) {
      dispatch(loginCheck());
    }
  }, [dispatch, isToken]);

  return (
    <ConnectedRouter history={history}>
      <FloatButton
        href="https://forms.gle/hhrYTh9eFxB3ZfYH9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ButtonBody>
          <FeedBackIcon />
        </ButtonBody>

        <ButtonCafe>
          <FeedBackCafeIcon />
        </ButtonCafe>
      </FloatButton>
      <WebVer />

      <Outter>
        <Container>
          <Header />
          <Switch>
            <PublickRoute path="/" exact component={Intro} />
            <PublickRoute path="/login" exact component={Login} />
            <PublickRoute path="/signup" exact component={Signup} />
            <PublickRoute path="/user/kakao/callback" exact component={Kakao} />
            <PrivateRoute path="/main" exact component={Main} />
            <PrivateRoute path="/cafeboard" exact component={CafeBoardMain} />
            <PrivateRoute
              path="/cafeboard/write"
              exact
              component={CafeBoardWrite}
            />
            <PrivateRoute
              path="/cafeboard/write/:id"
              exact
              component={CafeBoardWrite}
            />
            <PrivateRoute
              path="/cafeboard/detail/:cafeid"
              exact
              component={CafeBoardDetail}
            />
            <PrivateRoute
              path="/bulletinboard"
              exact
              component={BulletinBoardMain}
            />
            <PrivateRoute
              path="/bulletinboard/write"
              exact
              component={BulletinBoardWrite}
            />
            <PrivateRoute
              path="/bulletinboard/detail/:boardid"
              exact
              component={BulletinBoardDetail}
            />
            <PrivateRoute
              path="/bulletinboard/write/:id"
              exact
              component={BulletinBoardWrite}
            />
            <PrivateRoute
              path="/usermain/:nickname"
              exact
              component={UserMain}
            />
            <PrivateRoute
              path="/userpageprofileedit"
              exact
              component={UserpageProfileEdit}
            />
            <PrivateRoute
              path="/userpagefollowlist/:nickname"
              exact
              component={UserPageFollowList}
            />
            <PrivateRoute path="/searchmain" component={SearchMain} />
            <PrivateRoute path="/setting" component={Setting} />
            <NotFound />
          </Switch>
          <BottomNav />
        </Container>
      </Outter>
    </ConnectedRouter>
  );
}

const Container = styled.div`
  width: 375px;
  height: 100%;
  padding-bottom: 60px;
  position: relative;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Outter = styled.div`
  position: fixed;
  left: 60%;
  transform: translate(-60%, 0);
  height: 100vh;

  background-size: cover;
  background-repeat: no-repeat;
`;

const WebVer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -100;
  background: #fcb2c3;
  opacity: 0.18;

  @media only screen and (min-width: 1025px) {
    opacity: 1;
    background-size: cover;
    background-position: 50% 90%;
    background-repeat: no-repeat;
    background-image: url(${background});
  }
`;
const FloatButton = styled.a`
  width: 300px;
  position: fixed;
  right: 5%;
  top: 83%;
  z-index: 2;

  display: flex;

  @media only screen and (max-width: 1650px) {
    right: 5%;
  }
  @media only screen and (max-width: 1580px) {
    right: 3%;
  }
  @media only screen and (max-width: 1450px) {
    right: 5%;
    width: 80px;
  }
  @media only screen and (max-width: 1240px) {
    right: 3%;
  }
  @media only screen and (max-width: 1100px) {
    right: 3%;
  }
`;

const ButtonBody = styled.div`
  @media only screen and (max-width: 1450px) {
    display: none;
  }
`;

const ButtonCafe = styled.div`
  @media only screen and (max-width: 720px) {
    display: none;
  }
`;

export default App;
