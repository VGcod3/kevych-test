import { UserReq, UserRes } from "@/types/user/user.types";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const userApi = axios.create({
  baseURL: API_URL,
});

userApi.defaults.headers.common["Content-Type"] = "application/json";

export const getUserProfile = async () => {
  const response = await userApi.get<UserRes>("/profile");
  return response.data;
};

export const updateUserProfile = async (data: UserReq) => {
  const response = await userApi.put<UserRes>("/profile", data);
  return response.data;
};

export const deleteUserProfile = async (data: UserReq) => {
  const response = await userApi.put<UserRes>("/profile", data);
  return response.data;
};
