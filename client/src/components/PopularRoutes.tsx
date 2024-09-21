import { Button } from "@/components/ui/button";

export const PopularRoutes = () => {
  return (
    <section id="popular-routes" className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Popular Routes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { from: "London", to: "Manchester" },
            { from: "Paris", to: "Lyon" },
            { from: "Berlin", to: "Munich" },
            { from: "Rome", to: "Florence" },
            { from: "Amsterdam", to: "Brussels" },
            { from: "Madrid", to: "Barcelona" },
          ].map((route, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {route.from} to {route.to}
              </h3>
              <p className="text-gray-500 mb-4">Book now for best prices</p>
              <Button variant="outline">Check Availability</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
