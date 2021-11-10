import React from "react";
import { Route, Redirect } from "react-router-dom";

// 로그인 안했을때 접근 할 수 있는 컴포넌트

const PublickRoute = ({ component: Component, ...rest }) => {
  // 로컬 스토리지 토큰 확인
  const isToken = localStorage.getItem("USER_TOKEN") ? true : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isToken ? <Redirect to="/main" /> : <Component {...props} />
      }
    />
  );
};

export default PublickRoute;
