"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { EmailField, PasswordField } from "./Fields";
import { loginReqestSchema } from "@/types/auth/auth.login.types";

export const LoginForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginReqestSchema>>({
    resolver: zodResolver(loginReqestSchema),
    defaultValues: {
      email: "john.doe@example.com",
      password: "P@ssw0rd!",
    },
    reValidateMode: "onBlur",
  });

  const { login, refresh } = useAuth();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginReqestSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    login.mutate(values);
  }

  function refreshTokens() {
    // const refreshToken = localStorage.getItem("refreshToken")!;

    refresh.mutate(/* refreshToken */);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <EmailField control={form.control} />
        <PasswordField control={form.control} />
        <Button type="submit" className="w-full">
          Sign in
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={refreshTokens}
        >
          Refresh
        </Button>
      </form>
    </Form>
  );
};
