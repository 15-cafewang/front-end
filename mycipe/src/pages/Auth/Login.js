// 로그인 페이지
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";
import { loginDB } from "../../redux/Async/user";

// 알림 창
import PopUp from "../../shared/PopUp";

// style
import styled, { css } from "styled-components";
import { Button, Text } from "../../elements";
import Kakao from "../../assets/image/kakao.svg";

// 유효성 검사
import { emailCheck, pwCheck } from "../../shared/common";

// icon
import { ReactComponent as BackIcon } from "../../assets/icon/HeaderIcon/back.svg";

// 카카오 로그인
import { KAKAO_AUTH_URL } from "../../shared/KakaoAuth";

const Login = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});

  const kakaologin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const [popUp, setPopUp] = useState(null);
  const [message, setMessage] = useState("");

  const alertPopUp = (message, delay) => {
    setPopUp(true);
    setMessage(message);
    setTimeout(() => {
      setPopUp(false);
      history.push("/main");
    }, delay);
  };

  const login = async () => {
    try {
      const userResponse = await dispatch(loginDB(userInfo)).unwrap();
      alertPopUp(userResponse.message, 400);
    } catch (error) {
      alertPopUp(error, 700);
    }
  };

  // enter키 이벤트
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
        login()
    }
}

  return (
    <React.Fragment>
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>로그인</PageName>
      </HeaderInner>
      <LoginContainer>
        <PopUp
          popUp={popUp}
          setPopUp={setPopUp}
          message={message}
          isButton={false}
        />
        <Grid>
          <Text size="14px" margin="48px 0 0 0" lineheight="22px">
            이메일
          </Text>
          <InputId
            type="text"
            placeholder="이메일을 입력해주세요"
            value={userInfo.email || ""}
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
          {userInfo.email ? (
            emailCheck(userInfo.email) ? (
              <Text color="#FFFFFF" size="12px">
                *
              </Text>
            ) : (
              <Text color="#F05C5C" size="12px">
                이메일 형식이 올바르지 않습니다.
              </Text>
            )
          ) : (
            <Text color="#FFFFFF" size="12px">
              이메일을 입력해주세요.
            </Text>
          )}
        </Grid>
        <Grid>
          <Text size="14px" lineheight="22px">
            비밀번호
          </Text>
          <InputPwd
            type="password"
            placeholder="비밀번호"
            value={userInfo.password || ""}
            onKeyPress={onKeyPress}
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />
          {userInfo.password ? (
            pwCheck(userInfo.password) ? (
              <Text color="#FFFFFF" size="12px">
                *
              </Text>
            ) : (
              <Text color="#F05C5C" size="12px">
                비밀번호는 영문,숫자,특수문자를 포함하여 8자 이상 입력해주세요.
              </Text>
            )
          ) : (
            <Text color="#FFFFFF" size="12px">
              비밀번호를 입력해주세요.
            </Text>
          )}
        </Grid>
        {emailCheck(userInfo.email) && pwCheck(userInfo.password) ? (
          <Button margin="36px 20px 8px 20px" _onClick={login}>
            <Text color="#fff">로그인</Text>
          </Button>
        ) : (
          <Button margin="36px 20px 8px 20px" bg="#DBDBDB">
            <Text color="#767676">로그인</Text>
          </Button>
        )}
        <KakaoBtn
          src={Kakao}
          alt="카카오 로그인"
          onClick={() => kakaologin()}
        />
        <SignupBox>
          <Text color="#999999" size="12px" margin="0 0 0 60px">
            아직 계정이 없으신가요?
          </Text>
          &nbsp;
          <SignupText
            onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </SignupText>
        </SignupBox>
      </LoginContainer>
    </React.Fragment>
  );
};

export default Login;

const LoginContainer = styled.div`
  height: calc(100% - 60px);
`;

const HeaderInner = styled.div`
  width: 100%;
  height: 48px;
  z-index: 1;
  padding: 0px 20px;
  position: sticky;
  top: 0;

  background: #fff;
  display: flex;
  align-items: center;
  ${(props) =>
    props.flexBetween &&
    css`
      justify-content: space-between;
    `}
`;

const PageName = styled.span`
  font-size: 16px;
  margin-left: 8px;
`;
const Input = styled.input`
  padding: 10px;
`;

const Grid = styled.div`
  margin: 16px 0px 0px 20px;
`;

const InputId = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  height: 48px;
  border-radius: 6px;
`;
const InputPwd = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  height: 48px;
  border-radius: 6px;
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
const SignupBox = styled.div`
  margin: 150px 40px 60px;
  text-align: center;
  display: flex;
`;

const SignupText = styled.a`
  color: #191919;
  font-size: 12px;
  cursor: pointer;
`;
