import React from "react";
import styled from "styled-components";

import { Route } from "react-router-dom";

// pages
import RecipeBoardWrite from "../pages/RecipeBoard/RecipeBoardWrite";

function App() {
  return (
    <Container>
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
