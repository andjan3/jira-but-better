/**
 * Schema for validating task title.
 * - Name is required and has to be at least 1 character long.
 */

import { z } from "zod";

export const TaskFormSchema = z.object({
  message: z.string().min(1, "Task field can't be empty"),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
