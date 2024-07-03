import axios from "axios";

const instance = axios.create({
  baseURL: "https://Nuestro Back-End.com",
  withCredentials: true,
});

instance.defaults.headers["Access-Control-Expose-Headers"] = "*";
export default instance;
