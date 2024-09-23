import { z } from "zod";

export const userScema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof userScema>;

export const userResSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string(),
  email: z.string(),
  name: z.string(),
});

export type UserRes = z.infer<typeof userResSchema>;
