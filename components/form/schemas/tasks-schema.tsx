import { z } from "zod";

export const TaskFormSchema = z.object({
  message: z.string().min(1, "Task field can't be empty"),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
