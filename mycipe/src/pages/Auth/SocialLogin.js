import React from "react";

import styled from "styled-components";
import { Button } from "../../elements";

const SocialLogin = () => {
  return (
    <React.Fragment>
      <Main>
        <Title>내시피에서</Title>
        <Title>나만의 레시피를</Title>
        <Title>공유해 보세요!</Title>
      </Main>
      <ButtonGrid>
        <Button margin="8px 27.5px 8px 27.5px">
          <Text>로그인</Text>
        </Button>
        <Button bg="#DBDBDB">회원가입</Button>
      </ButtonGrid>
    </React.Fragment>
  );
};

export default SocialLogin;

const Main = styled.div`
  margin: 150px 152px 180px 32px;
`;
const ButtonGrid = styled.div``;

const Title = styled.div`
  font-size: 28px;
`;

const Text = styled.div`
  color: white;
`;
