import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, API_URL } from "./index.api";
import { GetRoutesResponse, RouteSearch } from "@/types/route/getRoutes.types";

export const routeApi = createApi({
  reducerPath: "routeApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getRoutes: builder.query<GetRoutesResponse, RouteSearch>({
      query: (query) => {
        console.log("Querying routes");

        return {
          url: "route",
          method: "GET",
          params: query,
        };
      },
    }),
  }),
});

export const { useLazyGetRoutesQuery } = routeApi;
