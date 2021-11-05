import React from "react";

import "../index.css";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";

// pages
import RecipeBoardWrite from "../pages/RecipeBoard/RecipeBoardWrite";
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

function App() {
  return (
    <Outter>
      <Container>
        <Route component={Header} />

      {/* <Route component={Main} /> */}

        <Route path="/recipeboard" exact component={RecipeBoardMain} />
        <Route path="/recipeboard/write" exact component={RecipeBoardWrite} />
        <Route path="/recipeboard/detail" exact component={RecipeBoardDetail} />
        <Route path="/bulletinboard" exact component={BulletinBoardMain} />
        <Route path="/bulletinboard/write" exact component={BulletinBoardWrite} />
        <Route
          path="/bulletinboard/detail"
          exact
          component={BulletinBoardDetail}
        />
        <Route component={SearchList} />
        <Route component={BottomNav} />
      </Container>
    </Outter>
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
  justify-content: cetner;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  background: red;
`;

export default App;
