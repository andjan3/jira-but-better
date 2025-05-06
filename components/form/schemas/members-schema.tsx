import { z } from "zod";

export const MemberSchema = z.object({
  userId: z.number(),
});

export type MemberFormValues = z.infer<typeof MemberSchema>;
