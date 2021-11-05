import axios from "axios";

const api = axios.create({
  baseURL: "http://jhhong0930.shop",
});

// interceptors
api.interceptors.request.use(async (config) => {
  config.headers["content-type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers.Accept = "*/*";
  return config;
});

api.interceptors.response.use(
  async (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log("에러 ", error);
    return Promise.reject(error);
  }
);
// user API

const signupAPI = (data) => {
  return api.post("/user/signup", {
    email: data.email,
    nickname: data.nickname,
    password: data.password,
    passwordCheck: data.passwordCheck,
  });
};

export { signupAPI };
