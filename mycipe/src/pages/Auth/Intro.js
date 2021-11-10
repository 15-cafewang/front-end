// mycipe첫페이지
import React from "react";
import { history } from "../../redux/configureStore";

// style
import styled from "styled-components";
import { Button } from "../../elements";
import Kakao from "../../assets/image/kakaologin.svg";

// 카카오 로그인
import { KAKAO_AUTH_URL } from "../../shared/KakaoAuth";

//env 값을 불러오기 위해서 설치
import dotenv from "dotenv";
dotenv.config();

const Intro = () => {
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

export default Intro;

const SocialLoginContainer = styled.div`
  height: calc(100% - 60px);
  margin-bottom: 50px;
`;

const Main = styled.div`
  /* margin : 180px 152px 100px 32px; */
  position: relative;
  top: 180px;
  right: 152px;
  bottom: 100px;
  left: 32px;
`;
const ButtonGrid = styled.div`
  position: absolute;
  top: 400px;
  left: 20px;
  right: 20px;
  bottom: 220px;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #767676;
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
