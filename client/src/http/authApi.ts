import { createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/http/index.api";
import { LoginReq, LoginRes } from "@/types/auth/auth.login.types";
import { RegisterReq, RegisterRes } from "@/types/auth/auth.register.types";
import { RefreshnRes } from "@/types/auth/auth.refresh.types";
import { axiosBaseQuery } from "@/http/index.api";

// Define the RTK Query API slice using Axios
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL, // Your API base URL
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginRes, LoginReq>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        data: credentials,
      }),
    }),
    register: builder.mutation<RegisterRes, RegisterReq>({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        data: userData,
      }),
    }),
    refresh: builder.query<RefreshnRes, void>({
      query: () => ({
        url: "auth/access-refresh",
        method: "GET",
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshQuery,
  useLogoutQuery,
} = authApi;
