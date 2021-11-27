import axios from "axios";
import { getToken } from "../utils";

const api = axios.create({
  baseURL: "https://nybae.shop/",
});

// interceptors
api.interceptors.request.use(
  async (config) => {
    config.headers["content-type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Accept"] = "*/*";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["authorization"] = await getToken();
    return config;
  },

  async (error) => {
    console.log("에러발생", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const {
      response: { status },
    } = error;
    if (
      status === 400 &&
      error.response.data.message === "로그인된 유저만 사용가능한 기능입니다."
    ) {
      localStorage.removeItem("USER_TOKEN");
    }
    return Promise.reject(error.response);
  }
);

export default api;
