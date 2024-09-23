"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getFromLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { hydrate, Token } from "@/store/authSlice";
import { User } from "@/types/user/user.types";
import { LoaderIcon } from "lucide-react";

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    const token = getFromLocalStorage("token") as Token;
    const user = getFromLocalStorage("user") as User;

    dispatch(
      hydrate({
        token,
        user,
      })
    );
  }, [dispatch]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );

  return <>{children}</>;
};
