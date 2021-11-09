import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

import styled from "styled-components";
import { Button } from "../../elements";

import { loginDB } from "../../redux/Async/user";
import { loginCheck } from "../../redux/Async/user";
import { emailCheck } from "../../shared/common";

import { KAKAO_AUTH_URL } from "../../shared/KakaoAuth";
import Kakao from "../../assets/image/kakaologin.svg";

const Login = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    dispatch(loginCheck());
    if (isLogin) {
      window.alert("로그인중입니다!메인화면으로 이동할게요. ");
      history.push("/main");
    }
  }, [isLogin]);

  const kakaologin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const emailLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    if (email === "" || password === "") {
      window.alert("아이디 or 패스워드를 입력하세요.");
    }

    if (!emailCheck(email)) {
      window.alert("이메일 형식이 맞지않습니다.");
    }
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
  height: calc(100% - 60px);
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
  color: #181604;
  &:active {
    opacity: 0.7;
  }
`;
