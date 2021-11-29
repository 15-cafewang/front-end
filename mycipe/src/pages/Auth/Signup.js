// 회원가입 페이지
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { signupDB, emailCheckDB, nickCheckDB } from "../../redux/Async/user";

// style
import styled, { css } from "styled-components";
import { Button, Text } from "../../elements";

// icon
import { ReactComponent as BackIcon } from "../../assets/icon/HeaderIcon/back.svg";

// 유효성 검사
import {
  emailCheck,
  pwCheck,
  nickCheck,
  pwdConfirm,
} from "../../shared/common";

// lodash 라이브러리
import _ from "lodash";

const Signup = () => {
  const dispatch = useDispatch();
  const checkEmail = useSelector((state) => state.user.emailConfirm);
  const checkNick = useSelector((state) => state.user.nickConfirm);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (userInfo.email) {
      dispatch(emailCheckDB(userInfo.email));
    }
  }, [dispatch, userInfo.email]);

  useEffect(() => {
    if (userInfo.nickname) {
      dispatch(nickCheckDB(userInfo.nickname));
    }
  }, [dispatch, userInfo.nickname]);
  const signup = () => {
    dispatch(signupDB(userInfo));
  };

  const debounceEmail = _.debounce((e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  }, 500);

  const debounceNick = _.debounce((e) => {
    setUserInfo({ ...userInfo, nickname: e.target.value });
  }, 500);

  return (
    <React.Fragment>
      <HeaderInner>
        <BackIcon
          onClick={() => {
            history.goBack();
          }}
        />
        <PageName>회원가입</PageName>
      </HeaderInner>
      <SignupContainer>
        <Grid>
          <Text size="14px" margin="48px 0 0 0" lineheight="22px">
            이메일
          </Text>

          <InputBox>
            <InputId
              type="text"
              placeholder="이메일을 입력해주세요"
              onChange={(e) => {
                debounceEmail(e);
              }}
            />
          </InputBox>
          {userInfo.email ? (
            emailCheck(userInfo.email) ? (
              checkEmail ? (
                <Text color="#0000CD" size="12px">
                  사용가능한 이메일입니다.
                </Text>
              ) : (
                <Text color="#F05C5C" size="12px">
                  이미 존재하는 이메일입니다.
                </Text>
              )
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
            닉네임
          </Text>
          <InputBox>
            <InputNick
              type="text"
              placeholder="2~8자이내로 입력해주세요"
              onChange={(e) => {
                debounceNick(e);
              }}
            />
          </InputBox>
          {userInfo.nickname ? (
            nickCheck(userInfo.nickname) ? (
              checkNick ? (
                <Text color="#0000CD" size="12px">
                  사용가능한 닉네임입니다.
                </Text>
              ) : (
                <Text color="#F05C5C" size="12px">
                  중복된 닉네임입니다.
                </Text>
              )
            ) : (
              <Text color="#F05C5C" size="12px">
                닉네임은 2-10자 이내로 입력해주세요.
              </Text>
            )
          ) : (
            <Text color="#FFFFFF" size="12px">
              닉네임을 입력해주세요.
            </Text>
          )}
        </Grid>
        <Grid>
          <Text size="14px" lineheight="22px">
            비밀번호
          </Text>
          <InputBox>
            <InputPwd
              type="password"
              placeholder="영문,숫자,특수문자 포함하여 8~20자"
              value={userInfo.password || ""}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
          </InputBox>
          {userInfo.password ? (
            pwCheck(userInfo.password) ? (
              <Text color="#0000CD" size="12px">
                사용가능한 비밀번호입니다.
              </Text>
            ) : (
              <Text color="#F05C5C" size="12px">
                비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상
                입력해주세요.
              </Text>
            )
          ) : (
            <Text color="#FFFFFF" size="12px">
              비밀번호를 입력해주세요.
            </Text>
          )}
        </Grid>
        <Grid>
          <Text size="14px" lineheight="22px">
            비밀번호 확인
          </Text>

          <InputBox>
            <InputPwdChk
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={userInfo.passwordCheck || ""}
              onChange={(e) => {
                setUserInfo({ ...userInfo, passwordCheck: e.target.value });
              }}
            />
          </InputBox>
          {userInfo.passwordCheck ? (
            pwdConfirm(userInfo.password, userInfo.passwordCheck) ? (
              <Text color="#0000CD" size="12px">
                비밀번호가 일치합니다.
              </Text>
            ) : (
              <Text color="#F05C5C" size="12px">
                비밀번호가 일치하지 않습니다
              </Text>
            )
          ) : (
            <Text color="#FFFFFF" size="12px">
              비밀번호를 다시 입력해주세요.
            </Text>
          )}
        </Grid>
        {checkEmail &&
        checkNick &&
        pwCheck(userInfo.password) &&
        pwdConfirm(userInfo.password, userInfo.passwordCheck) ? (
          <Button margin="32px 20px 8px 20px" _onClick={signup}>
            <Text color="#FFFFFF">계속하기</Text>
          </Button>
        ) : (
          <Button margin="32px 20px 8px 20px" bg="#DBDBDB">
            <Text color="#767676">계속하기</Text>
          </Button>
        )}
      </SignupContainer>
    </React.Fragment>
  );
};

export default Signup;

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

const SignupContainer = styled.div`
  height: 100%;
  margin-bottom: 230px;
`;

const Input = styled.input`
  padding: 16px;
`;
const Grid = styled.div`
  margin: 16px 0px 0px 20px;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
`;
const InputId = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  height: 48px;
  border-radius: 6px;
`;
const InputNick = styled(Input)`
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
const InputPwdChk = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  height: 48px;
  border-radius: 6px;
`;
