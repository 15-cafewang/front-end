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
// 로그인 체크
const loginCheckAPI = () => {
  return api.get("/user/info");
};

const KakaoAPI = (code) => api.get(`/user/kakao/callback?code=${code}`);

export { signupAPI, loginAPI, KakaoAPI, loginCheckAPI };
