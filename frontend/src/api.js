import axios from "axios";
import { API_URL } from "./config";

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export default API;
