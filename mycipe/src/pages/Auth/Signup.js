import React from "react";

import styled from "styled-components";
import { Button } from "../../elements";
import { ReactComponent as Back } from "../../assets/back.svg";

const Signup = () => {
  return (
    <React.Fragment>
      <Header>
        <Back />
        회원가입
      </Header>
      <InputId type="text" placeholder="이메일" />
      <InputNick type="text" placeholder="닉네임" />
      <InputPwd type="text" placeholder="비밀번호" />
      <InputPwdChk type="text" placeholder="비밀번호 확인" />
      <Button margin="32px 20px 8px 20px">
        <SignupText>계속하기</SignupText>
      </Button>
    </React.Fragment>
  );
};

export default Signup;

const Header = styled.div`
  display: flex;
  height: 48px;
`;
const InputId = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 56px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputNick = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputPwd = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;
const InputPwdChk = styled.input`
  background-color: #f8f8fa;
  width: 320px;
  margin: 0px 20px 8px 20px;
  height: 48px;
  border-radius: 6px;
`;

const SignupText = styled.div`
  color: white;
`;
