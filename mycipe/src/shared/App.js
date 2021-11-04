import React from "react";

import "../index.css";
import { Route } from "react-router-dom";
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

import BulletinBoardWrite from "../pages/BulletinBoard/BulletinBoardWrite";

function App() {
  return (
    <Container>
      <Route component={Header} />

      <Route component={Main} />
      <Route component={BottomNav} />

      <Route path="/recipeboard/write" exact component={RecipeBoardWrite} />
      <Route path="/bulletinboard/write" exact component={BulletinBoardWrite} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  height: auto;
  margin: 0 auto;
  position: absolute;
`;

export default App;
