import { z } from "zod";

export const PrioritySchema = z.object({
  priority: z
    .enum(["lowPriority", "mediumPriority", "highPriority"])
    .nullable(),
});

export type PriorityFormValues = z.infer<typeof PrioritySchema>;
