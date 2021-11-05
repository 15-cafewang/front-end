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

import BulletinBoardWrite from "../pages/BulletinBoard/BulletinBoardWrite";
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
