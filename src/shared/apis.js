import axios from "axios";

export const USER_ID = localStorage.getItem("userId");

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// request interceptors
api.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  config.headers.common["authorization"] = `Bearer ${accessToken}`;
  config.headers.common["reauthorization"] = `Bearer ${refreshToken}`;

  return config;
});

//참고: https://github.com/FinalProjectDEAR/dear_FE/blob/master/src/shared/apis.js
