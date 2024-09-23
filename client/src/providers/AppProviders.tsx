"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { LoadingProvider } from "./LoadingProvider";

// Create a client
const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LoadingProvider>{children}</LoadingProvider>
      </Provider>
    </QueryClientProvider>
  );
};
