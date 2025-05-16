/**
 * Schema for validating login form inputs.
 * - Email must be a valid email format.
 * - Password must be at least 6 characters long.
 */

import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password with at least 6 characters is required" }),
});

export type LoginFormValues = z.infer<typeof logInSchema>;
