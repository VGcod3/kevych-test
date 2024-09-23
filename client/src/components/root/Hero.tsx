"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyGetRoutesQuery } from "@/http/routeApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  AlertTriangle,
  CalendarIcon,
  ClockIcon,
  DollarSign,
  LoaderIcon,
  MapPinIcon,
  Search,
  TrainIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { routeSearchSchema } from "@/types/route/getRoutes.types";

export const Hero = () => {
  const form = useForm<z.infer<typeof routeSearchSchema>>({
    resolver: zodResolver(routeSearchSchema),
    defaultValues: {
      departure: "",
      destination: "",
      start: dayjs().format("YYYY-MM-DD"),
      sortBy: "early",
    },
    reValidateMode: "onBlur",
  });

  const [refetch, { data, isLoading, isError }] = useLazyGetRoutesQuery();

  async function onSubmit(values: z.infer<typeof routeSearchSchema>) {
    console.log(values);

    try {
      const response = await refetch({
        departure: values.departure,
        destination: values.destination,
        start: values.start,
        sortBy: values.sortBy,
      }).unwrap();

      console.log("Search response:", response);
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <section className="pt-10 sm:pt-16 lg:pt-24 bg-gradient-to-b from-indigo-100 to-white min-h-full">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name={"departure"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input type={"text"} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"destination"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input type={"text"} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sortBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort by</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sorting option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cheap">Cheapest</SelectItem>
                        <SelectItem value="fast">Fastest</SelectItem>
                        <SelectItem value="early">Soonest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="sm:col-span-2">
                <Button type="submit" className="w-full">
                  Search Trains
                  <Search className="w-5 h-5 ml-2" strokeWidth={1.5} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-10 mb-5 text-center grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
            <div className="col-span-full flex justify-center w-full">
              <LoaderIcon className="animate-spin" />
            </div>
          )}

          {isError && (
            <div className="col-span-full flex gap-3 justify-center w-full text-xl text-red-500 font-bold">
              <AlertTriangle className="w-6 h-6" />
              Something went wrong. Please try again later.
            </div>
          )}

          {!data?.length ? (
            <p className="text-center font-bold text-xl w-full col-span-full">
              Try to play with filters to see available tickets
            </p>
          ) : (
            data.map((route, i) => {
              const diff = dayjs(route.end).diff(dayjs(route.start));

              const duration = dayjs(diff).format("HH:mm");

              return (
                <Card
                  key={i}
                  className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <CardHeader className="bg-primary text-primary-foreground p-4">
                    <CardTitle className="text-2xl font-bold flex items-center">
                      <TrainIcon className="mr-2" />
                      {route.id.slice(0, 8)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center flex-1">
                        <MapPinIcon className="mr-2 text-primary" />
                        <span className="font-semibold">{route.departure}</span>
                      </div>
                      <div className="text-2xl font-bold flex-1">→</div>
                      <div className="flex items-center flex-1 justify-end">
                        <span className="font-semibold">
                          {route.destination}
                        </span>
                        <MapPinIcon className="ml-2 text-primary" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="mr-2 text-primary" />
                        <span>{dayjs(route.start).format("MMM D, YYYY")}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        <ClockIcon className="mr-2 text-primary" />
                        <span>
                          {dayjs(route.start).format("HH:mm")} -{" "}
                          {dayjs(route.end).format("HH:mm")}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <DollarSign className="mr-2 text-primary" />
                        <span>{route.price}</span>
                      </div>
                      <Badge variant="secondary">{duration}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
