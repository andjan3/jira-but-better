/**
 * Schema for validating task priority.
 * - Priority can be one of "lowPriority", "mediumPriority", or "highPriority".
 * - Priority is optional and can be null.
 */

import { z } from "zod";

export const PrioritySchema = z.object({
  priority: z
    .enum(["lowPriority", "mediumPriority", "highPriority"])
    .nullable(),
});

export type PriorityFormValues = z.infer<typeof PrioritySchema>;
