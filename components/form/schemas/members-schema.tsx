/**
 * Schema for validating assigment of a user.
 * - Userid must be a number.
 */

import { z } from "zod";

export const MemberSchema = z.object({
  userId: z.number(),
});

export type MemberFormValues = z.infer<typeof MemberSchema>;
