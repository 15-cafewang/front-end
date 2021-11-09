// 회원가입 페이지
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupDB, emailCheckDB, nickCheckDB } from "../../redux/Async/user";

// style
import styled from "styled-components";
import { Button, Text } from "../../elements";

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
  const [userinfo, setUserInfo] = useState({});

  useEffect(() => {
    if (userinfo.email) {
    }
    dispatch(emailCheckDB(userinfo.email));
  }, [dispatch, userinfo.email]);

  useEffect(() => {
    if (userinfo.nickname) {
    }
    dispatch(nickCheckDB(userinfo.nickname));
  }, [dispatch, userinfo.nickname]);
  console.log(userinfo);
  const signup = () => {
    dispatch(signupDB(userinfo));
  };

  const debounceEmail = _.debounce((e) => {
    setUserInfo({ ...userinfo, email: e.target.value });
  }, 1000);

  const debounceNick = _.debounce((e) => {
    setUserInfo({ ...userinfo, nickname: e.target.value });
  }, 500);

  return (
    <React.Fragment>
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
          {userinfo.email ? (
            emailCheck(userinfo.email) ? (
              checkEmail ? (
                <Text color="#E4E4E4" size="12px">
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
              placeholder="2~10자이내로 입력해주세요"
              onChange={(e) => {
                debounceNick(e);
              }}
            />
          </InputBox>
          {userinfo.nickname ? (
            nickCheck(userinfo.nickname) ? (
              checkNick ? (
                <Text color="#E4E4E4" size="12px">
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
              placeholder="영문,숫자,특수문자 포함하여 8자 이내"
              value={userinfo.password || ""}
              onChange={(e) => {
                setUserInfo({ ...userinfo, password: e.target.value });
              }}
            />
          </InputBox>
          {userinfo.password ? (
            pwCheck(userinfo.password) ? (
              <Text color="#E4E4E4" size="12px">
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
              value={userinfo.passwordCheck || ""}
              onChange={(e) => {
                setUserInfo({ ...userinfo, passwordCheck: e.target.value });
              }}
            />
          </InputBox>
          {userinfo.passwordCheck ? (
            pwdConfirm(userinfo.password, userinfo.passwordCheck) ? (
              <Text color="#E4E4E4" size="12px">
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
        pwCheck(userinfo.password) &&
        pwdConfirm(userinfo.password, userinfo.passwordCheck) ? (
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
