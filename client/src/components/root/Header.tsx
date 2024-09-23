"use client";
import { LogOut, Train } from "lucide-react";
import { Button } from "../ui/button";
import { useLogoutQuery } from "@/http/authApi";
import { useAppDispatch } from "@/store/hooks";
import { deleteToken, deleteUser } from "@/store/authSlice";

export const Header = () => {
  const { refetch } = useLogoutQuery();
  const dispatch = useAppDispatch();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Train className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-800">
            RailBooker
          </span>
        </div>
        <Button
          variant={"outline"}
          size={"icon"}
          className="text-opacity-70"
          onClick={() =>
            refetch().then(() => {
              dispatch(deleteUser());
              dispatch(deleteToken());
            })
          }
        >
          <LogOut strokeWidth={1.5} />
        </Button>
      </div>
    </header>
  );
};
