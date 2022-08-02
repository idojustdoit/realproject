import axios from "axios";

const API = axios.create({
  BASE_URL: "https://egloo.shop/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
