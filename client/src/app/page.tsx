import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Cta } from "../components/Cta";
import { Testimonial } from "../components/Testimonial";
import { PopularRoutes } from "../components/PopularRoutes";
import { HowItWorks } from "../components/HowItWorks";
import { Features } from "../components/Feature";
import { Hero } from "../components/Hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Hero />

        <Features />

        <HowItWorks />

        <PopularRoutes />

        <Testimonial />

        <Cta />
      </main>

      <Footer />
    </div>
  );
}
