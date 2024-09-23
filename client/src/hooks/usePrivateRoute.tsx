"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const usePrivateRoute = () => {
  const token = useAppSelector((state) => state.auth.token);

  const router = useRouter();

  useEffect(() => {
    // const token = getFromLocalStorage("accessToken");

    if (!token) {
      // Redirect to login if no token

      router.replace("/login");
    }
  }, [router, token]);
};

export default function PrivateWrapper({ children }: PropsWithChildren) {
  usePrivateRoute();

  return <>{children}</>;
}
