import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().min(1),
  },

  clientPrefix: "NEXT_PUBLIC_",

  client: {},

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
