import { z } from "zod";
import { loginReqestSchema, loginResponseSchema } from "./auth.login.types";

export const registerReqestSchema = loginReqestSchema.extend({
  name: z.string(),
});

const registerResponseSchema = loginResponseSchema;

export type RegisterRes = z.infer<typeof registerResponseSchema>;

export type RegisterReq = z.infer<typeof registerReqestSchema>;
