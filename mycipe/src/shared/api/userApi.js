import api from "./index";

const signupAPI = (data) => {
  return api.post("/user/signup", {
    email: data.email,
    nickname: data.nickname,
    password: data.password,
    passwordCheck: data.passwordCheck,
  });
};

const loginAPI = (data) => {
  return api.post("/user/login", {
    email: data.email,
    password: data.password,
  });
};

const KakaoAPI = (code) => api.get(`/user/kakao/callback?code=${code}`);

export { signupAPI, loginAPI, KakaoAPI };
