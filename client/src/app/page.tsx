import { Header } from "../components/root/Header";
import { Hero } from "../components/root/Hero";
import PrivateWrapper from "@/hooks/usePrivateRoute";

export default function LandingPage() {
  return (
    <PrivateWrapper>
      <div className="min-h-screen">
        <Header />

        <main>
          <Hero />
        </main>
      </div>
    </PrivateWrapper>
  );
}
