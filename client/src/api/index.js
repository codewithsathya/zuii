import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

const getCookie = (name) => {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
};

API.interceptors.request.use((req) => {
  if (getCookie("access_token")) {
    req.headers.authorization = `Bearer ${getCookie("access_token")}`;
  }

  return req;
});

export const googleSignIn = (formData) =>
  API.post("/api/user/googleLogin", formData);
