import React from "react";
import styled from "styled-components";
import { Button } from "../../elements/";

const UserpageProfileEdit = (props) => {
  return (
    <ProfileInfoInner>
      <UserProfileImageInner>
        <UserProfileImage />
      </UserProfileImageInner>
      <NickNameInputInner>
        <NickNameInputBox placeholder="닉네임" />
        <CheckButton>중복확인</CheckButton>
      </NickNameInputInner>
      <Button color="#fff">변경하기</Button>
    </ProfileInfoInner>
  );
};

const ProfileInfoInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfileImageInner = styled.div`
  margin: 56px;
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

const UserProfileImage = styled.img`
  background-color: red;
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

export default UserpageProfileEdit;
