import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginDB } from "../../redux/Async/user";

import styled from "styled-components";
import { Button } from "../../elements";

import { KAKAO_AUTH_URL } from "../../shared/KakaoAuth";
import Kakao from "../../assets/image/kakaologin.svg";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const kakaologin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const emailLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    dispatch(loginDB(data));
  };

  return (
    <React.Fragment>
      <LoginContainer>
        <InputId
          type="text"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputPwd
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button margin="42px 20px 8px 20px" _onClick={emailLogin}>
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
