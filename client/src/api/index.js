import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const googleSignIn = (formData) =>
  API.post("/api/user/googleLogin", formData);

export const getOrderList = () => API.get("/api/user/listOrders");

export const getRequests = () => API.get("/api/user/requests");

export const bookOrder = (orderCord) => API.post("/api/order/book", orderCord);

export const acceptOrder = (orderId) =>
  API.post("/api/order/acceptOrder", { orderId });

export const rejectOrder = (orderId) =>
  API.post("/api/order/rejectOrder", { orderId });

export const getFreeDrones = () => API.get("/api/drone/available");

export const freeTheDrone = (orderId) =>
  API.post("/api/drone/free", { orderId });
