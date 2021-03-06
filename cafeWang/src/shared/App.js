import React, { useEffect } from "react";

import "../index.css";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import PrivateRoute from "../auth/PrivateRoute";
import PublickRoute from "../auth/PublickRoute";

//ga
import ReactGA from "react-ga";

// icon
import { ReactComponent as FeedBackIcon } from "../assets/icon/feedBackIcon.svg";
import { ReactComponent as FeedBackCafeIcon } from "../assets/icon/feedBackCafeIcon.svg";

// pages
import Tutorial from "../pages/Tutorial/Tutorial";
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

ReactGA.event({
  category: "User",
  action: "Created an Account",
});
ReactGA.exception({
  description: "An error ocurred",
  fatal: true,
});

function App() {
  const dispatch = useDispatch();
  // 로컬 스토리지 토큰 확인
  const isToken = localStorage.getItem("USER_TOKEN") ? true : false;

  useEffect(() => {
    if (isToken) {
      dispatch(loginCheck());
    }
  }, [dispatch, isToken]);

  useEffect(() => {
    ReactGA.initialize("UA-213841557-1");
    history.listen((location) => {
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
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

      <Container>
        <Switch>
          <PublickRoute path="/" exact component={Tutorial} />
          <PublickRoute path="/intro" exact component={Intro} />
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
          <PrivateRoute path="/usermain/:nickname" exact component={UserMain} />
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
      </Container>
    </ConnectedRouter>
  );
}

const Container = styled.div`
  width: 375px;

  min-height: 100vh;
  padding-top: 48px;
  padding-bottom: 60px;
  position: relative;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  margin: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const WebVer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -100;
  background: #f4f4f4;

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
