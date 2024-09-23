import { User, UserRes } from "@/types/user/user.types";
import { appApi } from "../http/index.api";

export const getUserProfile = async () => {
  const response = await appApi.get<UserRes>("/users/profile");

  return response.data;
};

export const updateUserProfile = async (data: User) => {
  const response = await appApi.put<UserRes>("/users/profile", data);
  return response.data;
};

export const deleteUserProfile = async (data: User) => {
  const response = await appApi.put<UserRes>("/users/profile", data);
  return response.data;
};
