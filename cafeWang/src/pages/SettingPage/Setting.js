import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../redux/Modules/userSlice";

import Header from "../../shared/Header";

const Setting = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <InnerSetting>
        <LogoutButton
          onClick={() => {
            dispatch(logout());
            history.replace("/");
          }}
        >
          로그아웃
        </LogoutButton>
      </InnerSetting>
    </>
  );
};
const InnerSetting = styled.div`
  margin: 0px 20px 0px;
  min-height: 300px;
`;

const LogoutButton = styled.button`
font-family: 'Pretendard-Medium';
`;

export default Setting;
