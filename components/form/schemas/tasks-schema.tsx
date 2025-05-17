/**
 * Schema for validating task title.
 * - Title is required and has to be at least 1 character long.
 */

import { z } from "zod";

export const TaskFormSchema = z.object({
  taskTitle: z.string().min(1, {
    message: "Task field can't be empty",
  }),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
