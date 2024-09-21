import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  return (
    <section className="pt-10 sm:pt-16 lg:pt-24 bg-gradient-to-b from-indigo-100 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Book Your Train Journey</span>
            <span className="block text-indigo-600">Quick, Easy, Secure</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find and book train tickets for your next adventure. Compare prices,
            check schedules, and enjoy hassle-free bookings.
          </p>
        </div>
        <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                From
              </label>
              <Input
                type="text"
                id="from"
                name="from"
                placeholder="Departure Station"
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700"
              >
                To
              </label>
              <Input
                type="text"
                id="to"
                name="to"
                placeholder="Arrival Station"
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <Input type="date" id="date" name="date" className="mt-1" />
            </div>
            <div>
              <label
                htmlFor="passengers"
                className="block text-sm font-medium text-gray-700"
              >
                Passengers
              </label>
              <Select name="passengers">
                <SelectTrigger className=" mt-1">
                  <SelectValue placeholder="Passengers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full">
                Search Trains
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
