import React from "react";

import "../index.css";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";

// pages
import RecipeBoardWrite from "../pages/RecipeBoard/RecipeBoardWrite";
function App() {
  return (
    <Container>
      <Route component={Header} />
      <Route component={BottomNav} />
      <Route path="/recipeboard/write" exact component={RecipeBoardWrite} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 375px;
  height: 780px;
  margin: 0 auto;
`;

export default App;
