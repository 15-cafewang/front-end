import React, { useEffect } from "react";

import "../index.css";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";
import PrivateRoute from "../auth/PrivateRoute";
import PublickRoute from "../auth/PublickRoute";

// pages
import Intro from "../pages/Auth/Intro";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import RecipeBoardWrite from "../pages/RecipeBoard/RecipeBoardWrite";

import Kakao from "../components/Kakao";
import RecipeBoardMain from "../pages/RecipeBoard/RecipeBoardMain";
import RecipeBoardDetail from "../pages/RecipeBoard/RecipeBoardDetail";
import BulletinBoardWrite from "../pages/BulletinBoard/BulletinBoardWrite";
import BulletinBoardMain from "../pages/BulletinBoard/BulletinBoardMain";
import BulletinBoardDetail from "../pages/BulletinBoard/BulletinBoardDetail";
import Main from "../pages/MainPage/Main";
import UserMain from "../pages/UserPage/UserMain";
import UserpageProfileEdit from "../pages/UserPage/UserProfileEdit";
import UserPageFollowList from "../pages/UserPage/UserFollowList";

import SearchMain from "../pages/SearchPage/SearchMain";
import Setting from "../pages/SettingPage/Setting";
import background from "../assets/image/Background.png";

import { loginCheck } from "../redux/Async/user";

function App() {
  const dispatch = useDispatch();
  // 로컬 스토리지 토큰 확인
  const isToken = localStorage.getItem("USER_TOKEN") ? true : false;

  const AppRef = React.useRef();

  useEffect(() => {
    if (isToken) {
      dispatch(loginCheck());
    }
  }, [dispatch, isToken]);
  return (
    <ConnectedRouter history={history}>
      <WebVer />
      <Outter>
        <Container>
          <Header />
          <Switch>
            <PublickRoute path="/" exact component={Intro} />
            <PublickRoute path="/login" exact component={Login} />
            <PublickRoute path="/signup" exact component={Signup} />
            <PublickRoute path="/user/kakao/callback" exact component={Kakao} />
            <PrivateRoute>
              <PrivateRoute path="/main" exact component={Main} />
              <PrivateRoute
                path="/recipeboard"
                exact
                component={RecipeBoardMain}
              />
              <PrivateRoute
                path="/recipeboard/write"
                exact
                component={RecipeBoardWrite}
              />
              <PrivateRoute
                path="/recipeboard/write/:id"
                exact
                component={RecipeBoardWrite}
              />
              <PrivateRoute
                path="/recipeboard/detail/:recipeid"
                exact
                component={RecipeBoardDetail}
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
              <PrivateRoute
                path="/searchmain"
                component={SearchMain}
                ref={AppRef}
              />
              <PrivateRoute path="/setting" component={Setting} />
              <BottomNav />
            </PrivateRoute>
          </Switch>
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
`;

const Outter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  background-size: cover;
  background-repeat: no-repeat;
`;

const WebVer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -100;
  background: #ffe899;
  opacity: 0.18;

  @media only screen and (min-width: 1025px) {
    opacity: 1;
    background-size: cover;
    background-position: 50% 90%;
    background-repeat: no-repeat;
    background-image: url(${background});
  }
`;

export default App;
