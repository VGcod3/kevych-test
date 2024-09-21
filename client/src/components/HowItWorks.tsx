const steps = [
  { title: "Search", description: "Enter your travel details" },
  { title: "Select", description: "Choose your preferred train and seat" },
  { title: "Pay", description: "Complete your booking securely" },
  {
    title: "Travel",
    description: "Show your e-ticket and enjoy your journey",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          How It Works
        </h2>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-8">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-12 w-12 flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
