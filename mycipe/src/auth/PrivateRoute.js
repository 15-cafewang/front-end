import React from "react";
import { Route, Redirect } from "react-router-dom";

// 반드시 로그인을 해야만 접근 할 수 있는 컴포넌트

const PrivateRoute = ({ component: Component, ...rest }) => {
  // 로컬 스토리지 토큰 확인
  const isToken = localStorage.getItem("USER_TOKEN") ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
