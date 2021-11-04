import React from "react";

import "../index.css";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";

// pages
import RecipeBoardWrite from "../pages/RecipeBoard/RecipeBoardWrite";
import RecipeCard from "../components/Card/RecipeCard";
import BoardCard from "../components/Card/BoardCard";
import Main from "../pages/MainPage/Main";
function App() {
  return (
    <Container>
      <Route component={Header} />
      <Route component={Main} />
      <Route component={BottomNav} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 375px;
  height: auto;
  margin: 0 auto;
  position: absolute;
`;

export default App;
