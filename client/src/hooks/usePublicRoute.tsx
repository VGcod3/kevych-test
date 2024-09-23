"use client";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const usePublicRoute = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  console.log("token", token);

  useEffect(() => {
    if (token) {
      // If logged in, redirect to the dashboard
      router.replace("/");
    }
  }, [router, token]);
};

export default function PublicWrapper({ children }: PropsWithChildren) {
  usePublicRoute();

  return <>{children}</>;
}
