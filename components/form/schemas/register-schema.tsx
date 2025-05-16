/**
 * Schema for validating register form inputs.
 * -Username must be at least 2 characters long.
 * - Email must be a valid email format.
 * - Password must be at least 6 characters long.
 */

import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2, {
    message: "Username is required.",
  }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password with at least 6 characters is required" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
