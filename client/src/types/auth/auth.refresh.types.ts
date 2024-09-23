import { z } from "zod";

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
});

export type RefreshnRes = z.infer<typeof refreshResponseSchema>;
