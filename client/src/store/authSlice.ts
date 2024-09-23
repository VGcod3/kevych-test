// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user/user.types";
import {
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/hooks/useLocalStorage";

export type Token = string;

type AuthState = {
  token: Token | null;
  user: User | null;
  loading: boolean; // Add loading state
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      saveToLocalStorage("user", action.payload);
    },
    deleteUser: (state) => {
      state.user = null;
      state.loading = false;
      removeFromLocalStorage("user");
    },
    setToken: (state, action: PayloadAction<Token>) => {
      state.token = action.payload;
      state.loading = false;
      saveToLocalStorage("token", action.payload);
    },
    deleteToken: (state) => {
      state.token = null;
      state.loading = false;
      removeFromLocalStorage("token");
    },
    hydrate: (
      state,
      action: PayloadAction<{
        token: Token;
        user: User;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = state.loading = false;
    },
  },
});

export const { setUser, deleteUser, setToken, deleteToken, hydrate } =
  authSlice.actions;

export default authSlice.reducer;
