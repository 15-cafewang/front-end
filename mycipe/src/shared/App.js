import React from "react";

import "../index.css";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";

// pages
import SocialLogin from "../pages/Auth/SocialLogin";
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
import SearchList from "../pages/SearchPage/SearchList";

import background from "../assets/image/Background.png";

function App() {
  return (
    <ConnectedRouter history={history}>
      <WebVer />

      <Outter>
        <Container>
          <Header />
          <Switch>
            <Route path="/" exact component={SocialLogin} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/main" exact component={Main} />
            <Route path="/recipeboard" exact component={RecipeBoardMain} />
            <Route
              path="/recipeboard/write"
              exact
              component={RecipeBoardWrite}
            />
            <Route
              path="/recipeboard/detail/:recipeid"
              exact
              component={RecipeBoardDetail}
            />
            <Route path="/bulletinboard" exact component={BulletinBoardMain} />
            <Route
              path="/bulletinboard/write"
              exact
              component={BulletinBoardWrite}
            />
            <Route
              path="/bulletinboard/detail/:boardid"
              exact
              component={BulletinBoardDetail}
            />
            {/* 강표 */}
            <Route path="/main" exact component={Main} />
            <Route path="/usermain/:nickname" exact component={UserMain} />
            <Route
              path="/Userpageprofileedit"
              exact
              component={UserpageProfileEdit}
            />
            <Route
              path="/userpagefollowlist"
              exact
              component={UserPageFollowList}
            />
            <Route path="/user/kakao/callback" exact component={Kakao} />
            <Route path="/searchmain" component={SearchMain} />
            <Route path="/searchmain/searchlist" component={SearchList} />
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
