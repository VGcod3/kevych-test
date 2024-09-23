// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import { authApi } from "@/http/authApi";
import { userApi } from "@/http/userApi";
import { routeApi } from "@/http/routeApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [routeApi.reducerPath]: routeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(routeApi.middleware),
});

// Type definitions for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
