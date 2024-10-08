"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EmailField, PasswordField } from "./Fields";
import { loginReqestSchema } from "@/types/auth/auth.login.types";
import { useLoginMutation } from "@/http/authApi";
import { setToken, setUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginReqestSchema>>({
    resolver: zodResolver(loginReqestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onBlur",
  });

  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  async function onSubmit(values: z.infer<typeof loginReqestSchema>) {
    try {
      const response = await login(values).unwrap();

      dispatch(setToken(response.accessToken));
      dispatch(setUser(response.user));
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailField control={form.control} />
        <PasswordField control={form.control} />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <div className="flex gap-2 justify-center my-4">
        <p>OR</p>
      </div>
      <div className="text-center w-full underline">
        <Link href="/register">Create an account</Link>
      </div>
    </Form>
  );
};
