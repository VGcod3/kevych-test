import { LoginRes, LoginReq } from "@/types/auth/auth.login.types";
import { RegisterRes } from "@/types/auth/auth.register.types";
import axios from "axios";

// Define API endpoint
const API_URL = "http://localhost:5000/auth";

export const authApi = axios.create({
  baseURL: API_URL,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const errMessage = error.response.data.message as string;
    const statusCode = error.response.status;

    if (statusCode === 401 && errMessage === "Unauthorized") {
      try {
        originalRequest._retry = true;
        await refreshAccessTokenFn();
        return authApi(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const refreshAccessTokenFn = async (/* refreshToken: string */) => {
  const response = await authApi.post<LoginRes>("/login/access-token", {
    refreshToken: localStorage.getItem("refreshToken") || "",
  });
  return response.data;
};

export const loginFn = async (authData: LoginReq) => {
  const response = await authApi.post<LoginRes>("/login", authData);
  return response.data;
};

export const registerFn = async (authData: LoginReq) => {
  const response = await authApi.post<RegisterRes>("/register", authData);
  return response.data;
};
