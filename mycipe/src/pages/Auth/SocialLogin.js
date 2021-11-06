import React from "react";

import styled from "styled-components";
import { Button } from "../../elements";

import { history } from "../../redux/configureStore";
import { KAKAO_AUTH_URL } from "../../shared/KakaoAuth";
import Kakao from "../../assets/image/kakaologin.svg";

const SocialLogin = () => {
  const kakaologin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <React.Fragment>
      <SocialLoginContainer>
        <Main>
          <Title>
            <span style={{ color: "#7692E4" }}>내시피</span>
            에서
          </Title>
          <Title>나만의 레시피를</Title>
          <Title>공유해 보세요!</Title>
        </Main>
        <ButtonGrid>
          <Button
            _onClick={() => {
              history.push("/login");
            }}
          >
            <Text>로그인</Text>
          </Button>
          <KakaoBtn
            src={Kakao}
            alt="카카오 로그인"
            onClick={() => kakaologin()}
          />
          <Button
            bg="#DBDBDB"
            _onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
        </ButtonGrid>
      </SocialLoginContainer>
    </React.Fragment>
  );
};

export default SocialLogin;

const SocialLoginContainer = styled.div`
  height: 100%;
  margin-bottom: 50px;
`;

const Main = styled.div`
  margin: 180px 152px 100px 32px;
`;
const ButtonGrid = styled.div``;

const Title = styled.div`
  font-size: 28px;
`;

const KakaoBtn = styled.img`
  margin: 8px auto;
  display: block;
  cursor: pointer;
  height: 48px;
  &:active {
    opacity: 0.7;
  }
`;

const Text = styled.div`
  color: white;
`;
