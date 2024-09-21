import { z } from "zod";

export const userReqSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

export type UserReq = z.infer<typeof userReqSchema>;

export const userResSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string(),
  email: z.string(),
  name: z.string(),
});

export type UserRes = z.infer<typeof userResSchema>;
