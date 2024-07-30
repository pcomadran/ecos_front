// src/services/axiosConfig.js

import axios from "axios";

const instance = axios.create({
  // baseURL: "https://ecodeploy-1.onrender.com",
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

instance.defaults.headers["Access-Control-Expose-Headers"] = "*";

export default instance;
