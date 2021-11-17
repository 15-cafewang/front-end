import axios from "axios";
import { getToken } from "../utils";

const api = axios.create({
  // baseURL: "http://3.34.143.150:8080/",
  // baseURL: "http://jhhong0930.shop",
  // baseURL: "http://3.36.78.242:8080/",
  baseURL: "http://54.180.68.116:8080/",
});

// interceptors
api.interceptors.request.use(
  async (config) => {
    config.headers["content-type"] = "application/json; charset=utf-8";
    config.headers["Accept"] = "*/*";
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
    console.log("에러발생 ", error);
    return Promise.reject(error);
  }
);

export default api;
