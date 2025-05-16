import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    controlPassword: z.string().min(8, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.controlPassword, {
    message: "Passwords must match",
    path: ["controlPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
