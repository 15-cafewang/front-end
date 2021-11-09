import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../redux/Modules/userSlice";

const Setting = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  return (
    <LogoutButton
      onClick={() => {
        dispatch(logout());
        history.replace("/");
      }}
    >
      로그아웃
    </LogoutButton>
  );
};

const LogoutButton = styled.button``;

export default Setting;
