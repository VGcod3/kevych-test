/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { refreshAccessTokenFn } from "../services/auth.service.api";
import { deleteToken, setToken } from "@/store/authSlice";
import { store } from "@/store/store";

// Define API endpoint
export const API_URL = "http://localhost:5000/";

export const appApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

appApi.defaults.headers.common["Content-Type"] = "application/json";

appApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshAccessTokenFn();
        store.dispatch(setToken(token.accessToken));

        return appApi.request(originalRequest);
      } catch (error) {
        store.dispatch(deleteToken());

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

appApi.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  config.headers.Authorization = token
    ? `Bearer ${token}`
    : config.headers.Authorization;

  return config;
});

// Define the types for Axios Base Query
interface AxiosBaseQueryArgs {
  url: string;
  method: string;
  data?: any;
  params?: any;
}

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, data, params }: AxiosBaseQueryArgs) => {
    try {
      const result = await appApi({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError.response?.data
        ? axiosError.response.data
        : axiosError;
      return { error: { status: axiosError.response?.status, data: err } };
    }
  };
