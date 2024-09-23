"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EmailField, NameField, PasswordField } from "./Fields";
import { useRegisterMutation } from "@/http/authApi";
import { setToken, setUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { registerReqestSchema } from "@/types/auth/auth.register.types";
import Link from "next/link";

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerReqestSchema>>({
    resolver: zodResolver(registerReqestSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    reValidateMode: "onBlur",
  });

  const [register] = useRegisterMutation();

  const dispatch = useAppDispatch();

  async function onSubmit(values: z.infer<typeof registerReqestSchema>) {
    try {
      const response = await register(values).unwrap();

      dispatch(setToken(response.accessToken));
      dispatch(setUser(response.user));
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <NameField control={form.control} />
        <EmailField control={form.control} />
        <PasswordField control={form.control} />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
      <div className="flex gap-2 justify-center my-4">
        <p>OR</p>
      </div>
      <div className="text-center w-full underline">
        <Link href="/login">Already have an account</Link>
      </div>
    </Form>
  );
};
