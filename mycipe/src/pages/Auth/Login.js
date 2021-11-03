import React from "react";

import styled from "styled-components";
import { Button } from "../../elements";
import { ReactComponent as Back } from "../../assets/back.svg";

const Login = () => {
  return (
    <React.Fragment>
      <Header>
        <Back />
        로그인
      </Header>
      <InputId type="text" placeholder="이메일" />
      <InputPwd type="text" placeholder="비밀번호" />
      <Button margin="42px 20px 8px 20px">
        <LoginText>로그인</LoginText>
      </Button>
    </React.Fragment>
  );
};

export default Login;

const Header = styled.div`
  display: flex;
  height: 48px;
`;

const InputId = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 56px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputPwd = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;

const LoginText = styled.div`
  color: white;
`;
