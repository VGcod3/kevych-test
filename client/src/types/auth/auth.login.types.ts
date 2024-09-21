import { z } from "zod";

export const loginReqestSchema = z.object({
  email: z.string().email(),

  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
});

export type LoginRes = z.infer<typeof loginResponseSchema>;

export type LoginReq = z.infer<typeof loginReqestSchema>;
