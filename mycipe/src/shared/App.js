import React from "react";
import "../index.css";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";

function App() {
  return (
    <Container>
      <Route component={Header} />
      <Route component={BottomNav} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 375px;
  height: 780px;
`;

export default App;
