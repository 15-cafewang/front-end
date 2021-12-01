// mycipe첫페이지
import React from "react";
import { history } from "../../redux/configureStore";

// style
import styled from "styled-components";
import { Button } from "../../elements";
import Kakao from "../../assets/image/kakao.svg";
import { ReactComponent as IntroIcon } from "../../assets/image/Intro.svg";

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
          <IntroIcon />
        </Main>
        <ButtonGrid>
          <Button
            margin="0 0 0 28px"
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
            margin="0 0 0 28px"
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
  position: absolute;
  margin: 200px 77px 518px 77px;
`;
const ButtonGrid = styled.div`
  position: absolute;
  margin: 400px 0 220px 0;
  align-items: center;
`;

const KakaoBtn = styled.img`
  margin: 8px 0 8px 28px;
  display: block;
  cursor: pointer;
  height: 48px;
  &:active {
    opacity: 0.7;
  }
`;

const Text = styled.div`
  color: white;
  font-family: "Pretendard-Medium";
`;
