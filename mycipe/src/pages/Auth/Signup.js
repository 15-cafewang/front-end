import React, { useState } from "react";

import styled from "styled-components";
import { Button } from "../../elements";

import { useDispatch } from "react-redux";
import { signupDB } from "../../redux/Async/user";

import { emailCheck, pwCheck } from "../../shared/common";

const Signup = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const onClickSignUp = () => {
    const data = {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
      nickname: nickname,
    };

    if (email === "" || nickname === "" || password === "") {
      window.alert("아이디,패스워드,닉네임 모두 작성해주세요.");
      return;
    }

    if (!emailCheck(email)) {
      window.alert("이메일 형식이 맞지않습니다. ");
      return;
    }

    if (password !== passwordCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!pwCheck(password)) {
      window.alert("비밀번호 형식을 확인해주세요!");
      return;
    }

    dispatch(signupDB(data));
  };

  return (
    <React.Fragment>
      <SignupContainer>
        <InputId
          type="text"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputNick
          type="text"
          placeholder="닉네임(2~10자이내)"
          onChange={(e) => setNickname(e.target.value)}
        />
        <InputPwd
          type="password"
          placeholder="비밀번호(특수문자,영어,숫자포함 8~20자이내)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputPwdChk
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <Button margin="32px 20px 8px 20px" _onClick={onClickSignUp}>
          <SignupText>계속하기</SignupText>
        </Button>
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
  padding: 10px;
`;

const InputId = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  margin: 56px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputNick = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
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
const InputPwdChk = styled(Input)`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;

const SignupText = styled.div`
  color: white;
`;
