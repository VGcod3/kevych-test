import { Search, Train, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Easy Search",
    description: "Find the best routes quickly",
  },
  {
    icon: <Train className="h-6 w-6" />,
    title: "Wide Network",
    description: "Access to all major railways",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Real-time Updates",
    description: "Get live train status and delays",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Secure Payments",
    description: "Book with confidence",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Why Choose RailBooker?
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
