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

function App() {
  return (
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
      <Route component={BottomNav} />
    </Container>
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
