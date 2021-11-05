import React, { useState } from "react";

import styled from "styled-components";
import { Button } from "../../elements";

import { useDispatch } from "react-redux";
import { signupDB } from "../../redux/Async/user";

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
    console.log(data);
    dispatch(signupDB(data));
    console.log(data);
  };
  return (
    <React.Fragment>
      <InputId
        type="text"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputNick
        type="text"
        placeholder="닉네임"
        onChange={(e) => setNickname(e.target.value)}
      />
      <InputPwd
        type="text"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputPwdChk
        type="text"
        placeholder="비밀번호 확인"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <Button margin="32px 20px 8px 20px" _onClick={onClickSignUp}>
        <SignupText>계속하기</SignupText>
      </Button>
    </React.Fragment>
  );
};

export default Signup;

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
