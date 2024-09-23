import PublicWrapper from "@/hooks/usePublicRoute";
import { Card, CardHeader, CardContent } from "../ui/card";

export const AuthLayout = ({
  children,
  greeting,
}: {
  children: React.ReactNode;
  greeting: string;
}) => {
  return (
    <PublicWrapper>
      <div className="w-full grid xl:grid-cols-2 h-screen">
        <div className="col-span-1 w-full h-full flex items-center justify-center p-6">
          <Card className="max-w-md w-full min-h-96">
            <CardHeader>
              <h2 className="text-2xl font-bold opacity-80">{greeting}</h2>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
        <div className="col-span-1 w-full h-full bg-primary hidden xl:flex"></div>
      </div>
    </PublicWrapper>
  );
};
