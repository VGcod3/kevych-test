export const Testimonial = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          What Our Travelers Say
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-md">
          <blockquote>
            <p className="text-xl text-gray-900 italic">
              {`"RailBooker made my European train adventure so easy! I could book
              all my tickets in one place, and the real-time updates were a
              lifesaver when there were delays."`}
            </p>
          </blockquote>
          <div className="mt-4 flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src="/placeholder.svg?height=48&width=48"
              alt="User avatar"
            />
            <div className="ml-4">
              <div className="text-base font-medium text-gray-900">
                Emily Thompson
              </div>
              <div className="text-base text-gray-500">Frequent Traveler</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
