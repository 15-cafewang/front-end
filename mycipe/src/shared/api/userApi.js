import api from "./index";

// 회원가입
const signupAPI = (data) => {
  console.log(data);
  return api.post("/user/signup", {
    email: data.email,
    nickname: data.nickname,
    password: data.password,
    passwordCheck: data.passwordCheck,
  });
};

// 로그인
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

// 이메일 중복체크
const emailCheckAPI = (email) => {
  console.log(email);
  return api.post("/user/signup/email", { email });
};

// 닉네임 중복체크
const nicknameCheckAPI = (nickname) => {
  return api.post("/user/signup/nickname", { nickname });
};

// 회원정보변경 ( 프로필이미지 + 닉네임)
const updateUserInfoWithImageAPI = (userInfo) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  return api.put("/user/info", userInfo, config);
};

// 회원정보변경 ( 닉네임)
const updateUserInfoAPI = (newNickname) => {
  return api.put(`/user/info/nickname`, newNickname);
};

// 카카오 로그인
const KakaoAPI = (code) => api.get(`/user/kakao/callback?code=${code}`);

export {
  signupAPI,
  loginAPI,
  KakaoAPI,
  loginCheckAPI,
  emailCheckAPI,
  nicknameCheckAPI,
  updateUserInfoWithImageAPI,
  updateUserInfoAPI,
};
