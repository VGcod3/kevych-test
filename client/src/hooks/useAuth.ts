import {
  loginFn,
  refreshAccessTokenFn,
  registerFn,
} from "@/services/auth.service.api";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const loginReqest = useMutation({
    mutationFn: loginFn,

    onSuccess: (data) => {
      // Store tokens or manage session
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const refreshRequest = useMutation({
    mutationFn: refreshAccessTokenFn,

    onSuccess: (data) => {
      // Store tokens or manage session
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error("Refresh error:", error);
    },
  });

  const registerRequest = useMutation({
    mutationFn: registerFn,

    onSuccess: (data) => {
      // Store tokens or manage session
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
  });

  return {
    login: loginReqest,
    refresh: refreshRequest,
    register: registerRequest,
  };
};
