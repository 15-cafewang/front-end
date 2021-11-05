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
import RecipeCard from "../components/Card/RecipeCard";
import BoardCard from "../components/Card/BoardCard";
import Main from "../pages/MainPage/Main";
import Kakao from "../components/Kakao";

import BulletinBoardWrite from "../pages/BulletinBoard/BulletinBoardWrite";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Container>
        <Route component={Header} />
        <Switch>
          <Route path="/" exact component={SocialLogin} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />

          {/* <Route component={Main} /> */}

          <Route path="/recipeboard/write" exact component={RecipeBoardWrite} />
          <Route
            path="/bulletinboard/write"
            exact
            component={BulletinBoardWrite}
          />
          <Route path="/user/kakao/callback exact component={Kakao}" />
        </Switch>
        <Route component={BottomNav} />
      </Container>
    </ConnectedRouter>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  height: auto;
  margin: 0 auto;
  position: relative;
`;

export default App;
