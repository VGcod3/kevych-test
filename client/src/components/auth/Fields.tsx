import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { LoginReq } from "@/types/auth/auth.login.types";

export const PasswordField = ({ control }: { control: Control<LoginReq> }) => {
  const [showPassword, setShowPassword] = useState(false);

  const Eye = showPassword ? EyeOffIcon : EyeIcon;

  return (
    <FormField
      control={control}
      name={"password"}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} {...field} />
              <Button
                size={"icon"}
                variant={"ghost"}
                type="button"
                className="absolute top-1/2 right-1 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Eye className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </Button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const EmailField = ({ control }: { control: Control<LoginReq> }) => {
  return (
    <FormField
      control={control}
      name={"email"}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type={"text"} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
