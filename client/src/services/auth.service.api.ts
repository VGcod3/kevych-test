import { LoginRes, LoginReq } from "@/types/auth/auth.login.types";
import { RegisterRes } from "@/types/auth/auth.register.types";

import { API_URL, appApi } from "../http/index.api";
import axios from "axios";

export const loginFn = async (authData: LoginReq) => {
  const response = await appApi.post<LoginRes>("/auth/login", authData);
  return response.data;
};

export const refreshAccessTokenFn = async () => {
  const response = await axios.get<{
    accessToken: string;
  }>(`${API_URL}auth/login/access-token`, {
    withCredentials: true,
  });
  return response.data;
};

export const registerFn = async (authData: LoginReq) => {
  const response = await appApi.post<RegisterRes>("/auth/register", authData);
  return response.data;
};

export const logoutFn = async () => {
  const response = await appApi.get("/auth/logout");
  return response.data;
};
