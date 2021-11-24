import React, { useRef, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";
import _ from "lodash";

import ModalBackground from "../../shared/ModalBackground";
import PopUp from "../../shared/PopUp";

import { nickCheck as validNickname } from "../../shared/common";
import { Button, Text } from "../../elements/";

import ImageUpload from "../../shared/ImageUpload";

import { updateUserInfoDB } from "../../redux/Async/user";

import { nicknameCheckAPI as confirmNicknameAPI } from "../../shared/api/userApi";
import { updateUserInfo } from "../../redux/Modules/userSlice";

const UserpageProfileEdit = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const LoginUserInfo = useSelector((state) => state.user.userInfo);

  const [file, setFile] = useState({
    file: "",
    previewURL: LoginUserInfo.profileImage,
  });

  // alert
  const [popUp, setPopUp] = useState(null);
  const [message, setMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  const alertPopUp = (message, delay, newNickname = null) => {
    setPopUp(true);
    setMessage(message);

    setTimeout(() => {
      setPopUp(false);
      newNickname && history.push(`/usermain/${newNickname}`);
    }, delay);
  };

  //새로운 닉네임 input
  const inputRef = useRef();

  //유저정보 변경
  const updateInfo = async () => {
    try {
      const newNickname = inputRef.current.value;
      const profileFofmData = new FormData();

      profileFofmData.append("nickname", newNickname);

      if (file.file) {
        profileFofmData.append("image", file.file);
      }

      const msg = await dispatch(updateUserInfoDB(profileFofmData)).unwrap();
      console.log(msg);
      dispatch(
        updateUserInfo({
          nickname: newNickname,
          profileImage: file.previewURL,
        })
      );
      //alert
      alertPopUp(msg, 700, newNickname);
    } catch (errorMsg) {
      //alert
      alertPopUp(errorMsg, 1000);
    }
  };

  const [validStatus, setValidStatus] = useState(true);
  //유효성검사
  const validDebounce = _.debounce((e) => {
    setValidStatus(validNickname(inputRef.current.value));
  }, 300);

  //중복확인
  const confirmNickname = async () => {
    try {
      const response = await confirmNicknameAPI(inputRef.current.value);
      setIsConfirm(true);
      alertPopUp(response.data.message, 700);
    } catch (error) {
      alertPopUp(error.data.message, 700);
    }
  };

  return (
    <ProfileInfoInner>
      {isActive && <ModalBackground />}
      {/* alert 창 */}
      <PopUp
        popUp={popUp}
        setPopUp={setPopUp}
        message={message}
        isButton={false}
      />

      <UserProfileImageInner onClick={() => {}}>
        <ImageUpload
          profileImage={LoginUserInfo.profileImage}
          file={file}
          setFile={setFile}
        />
      </UserProfileImageInner>
      <Grid>
        <NickNameInputInner>
          <NickNameInputBox
            ref={inputRef}
            type="text"
            placeholder="닉네임을 입력해주세요"
            defaultValue={LoginUserInfo.nickname}
            onChange={(e) => {
              validDebounce(e);
            }}
          />

          <CheckButton onClick={confirmNickname}>중복확인</CheckButton>
        </NickNameInputInner>
        {validStatus ? (
          <Text color="#191919" size="12px" margin="0px 0px 0px 6px">
            중복확인을 해주세요.
          </Text>
        ) : (
          <Text color="#F05C5C" size="12px" margin="0px 0px 0px 6px ">
            닉네임은 2-10자 이내로 입력해주세요.
          </Text>
        )}
      </Grid>

      <Button
        color="#fff"
        _onClick={() => {
          if (isConfirm) updateInfo();
          else alertPopUp("중복확인을 해주세요", 700);
        }}
      >
        변경하기
      </Button>
    </ProfileInfoInner>
  );
};

const Grid = styled.div``;

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
  margin-bottom: 4px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
`;

const CheckButton = styled.button`
  color: #000000;
  font-weight: 500;
`;

const NickNameInputBox = styled.input`
  width: 225px;
`;

export default UserpageProfileEdit;
