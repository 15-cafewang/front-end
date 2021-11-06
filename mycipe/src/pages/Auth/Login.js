import React from "react";

import styled from "styled-components";
import { Button } from "../../elements";

import { KAKAO_AUTH_URL } from "../../shared/KakaoAuth";
import Kakao from "../../assets/image/kakaologin.svg";

const Login = () => {
  const kakaologin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <React.Fragment>
      <LoginContainer>
        <InputId type="text" placeholder="이메일" />
        <InputPwd type="password" placeholder="비밀번호" />
        <Button margin="42px 20px 8px 20px">
          <LoginText>로그인</LoginText>
        </Button>
        <KakaoBtn
          src={Kakao}
          alt="카카오 로그인"
          onClick={() => kakaologin()}
        />
      </LoginContainer>
    </React.Fragment>
  );
};

export default Login;

const LoginContainer = styled.div`
  height: 100%;
  margin-bottom: 280px;
`;

const Input = styled.input`
  padding: 10px;
`;

const InputId = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  margin: 56px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputPwd = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;

const LoginText = styled.div`
  color: white;
`;

const KakaoBtn = styled.img`
  margin: 8px 20px 0 20px;
  display: block;
  cursor: pointer;
  height: 48px;
  &:active {
    opacity: 0.7;
  }
`;
