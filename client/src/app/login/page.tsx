import { LoginForm } from "@/components/auth/LoginForm";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="w-full grid xl:grid-cols-2 h-screen">
      <div className="col-span-1 w-full h-full flex items-center justify-center p-6">
        <Card className="max-w-md w-full min-h-96">
          <CardHeader>
            <h2 className="text-2xl font-bold opacity-80">Sign Up</h2>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 w-full h-full bg-primary hidden xl:flex"></div>
    </div>
  );
}
