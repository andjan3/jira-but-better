/**
 * Schema for validating changed password.
 * - Password must be at least 6 characters.
 * - Confirmation password must match the password.
 */

import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    controlPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.controlPassword, {
    message: "Passwords must match",
    path: ["controlPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
