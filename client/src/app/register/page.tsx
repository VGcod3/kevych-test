import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Login() {
  return (
    <AuthLayout greeting="Sign Up">
      <RegisterForm />
    </AuthLayout>
  );
}
