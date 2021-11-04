import React from "react";

import "../index.css";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";

// pages
import RecipeBoardWrite from "../pages/RecipeBoard/RecipeBoardWrite";
import BulletinBoardWrite from "../pages/BulletinBoard/BulletinBoardWrite";

function App() {
  return (
    <Container>
      <Route component={Header} />
      {/* <Route component={BottomNav} /> */}
      <Route path="/recipeboard/write" exact component={RecipeBoardWrite} />
      <Route path="/bulletinboard/write" exact component={BulletinBoardWrite} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  height: 100%;
  margin: 0 auto;
`;

export default App;
