import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Cta = () => {
  return (
    <section className="py-12 bg-indigo-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to start your journey?</span>
          <span className="block">
            Sign up now and get 10% off your first booking!
          </span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-50"
            >
              Sign up for free
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
