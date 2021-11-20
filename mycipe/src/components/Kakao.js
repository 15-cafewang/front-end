import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../redux/Async/user";
import Spinner from "../assets/image/Spinner.gif";

const Kakao = (props) => {
  const dispatch = useDispatch();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  React.useEffect(() => {
    dispatch(kakaoLogin(code));
  }, []);
  return (
    <SpinnerBox>
      <SpinnerImg src={Spinner} />
    </SpinnerBox>
  );
};

export default Kakao;

const SpinnerBox = styled.div`
  text-align: center;
`;

const SpinnerImg = styled.img`
  margin-top: 25vh;
`;
