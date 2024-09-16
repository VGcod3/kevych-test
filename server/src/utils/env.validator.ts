import { z } from 'zod';
import * as dotenv from 'dotenv';

// Define the schema for your environment variables
const schema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string(),
  JWT_SECRET: z.string(),
});

export const validateEnv = () => {
  dotenv.config();

  const env = process.env;
  const parsedEnv = schema.parse(env);
  return parsedEnv;
};
