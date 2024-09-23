import { z } from "zod";

export const routeSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  price: z.number(),
  departure: z.string(),
  start: z.string(),
  destination: z.string(),
  end: z.string(),
  duration: z.number(),
});

export type Route = z.infer<typeof routeSchema>;

export const getRoutesResponseSchema = z.array(routeSchema);

export type GetRoutesResponse = z.infer<typeof getRoutesResponseSchema>;

export const routeSearchSchema = z.object({
  departure: z.string({
    message: "Departure station is required",
  }),
  destination: z.string({
    message: "Destination station is required",
  }),
  start: z.string(),
  sortBy: z.enum(["fast", "cheap", "early"]),
});

export type RouteSearch = z.infer<typeof routeSearchSchema>;
