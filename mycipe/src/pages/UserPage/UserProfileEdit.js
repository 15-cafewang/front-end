import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Button, Image } from "../../elements/";

import ModalBackground from "../../shared/ModalBackground";

const UserpageProfileEdit = (props) => {
  const isActive = useSelector((state) => state.modal.isActive);
  const LoginUserInfo = useSelector((state) => state.user.userInfo);

  const inputRef = useRef();

  return (
    <ProfileInfoInner>
      {isActive && <ModalBackground />}
      <UserProfileImageInner onClick={() => {}}>
        <EditButtonInner></EditButtonInner>

        <Image shape="circle" size="large" />
      </UserProfileImageInner>
      <NickNameInputInner>
        <NickNameInputBox ref={inputRef} placeholder="닉네임" />
        <CheckButton>중복확인</CheckButton>
      </NickNameInputInner>
      <Button color="#fff">변경하기</Button>
    </ProfileInfoInner>
  );
};

const EditButtonInner = styled.div`
  position: absolute;

  right: 0;
  bottom: 0;
`;
const ProfileInfoInner = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfileImageInner = styled.button`
  margin: 56px;
  position: relative;
`;

const NickNameInputInner = styled.div`
  width: 320px;
  height: 48px;
  background: #f8f8fa;
  margin-bottom: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
`;

const CheckButton = styled.button`
  color: #7692e4;
`;

const NickNameInputBox = styled.input`
  width: 225px;
`;

export default UserpageProfileEdit;
