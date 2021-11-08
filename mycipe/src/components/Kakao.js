import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../redux/Async/user";

const Kakao = (props) => {
  const dispatch = useDispatch();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  React.useEffect(() => {
    dispatch(kakaoLogin(code));
  }, []);
  return (
    <>
      <div>로딩중</div>;
    </>
  );
};

export default Kakao;
