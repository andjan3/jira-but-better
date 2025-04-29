import { z } from "zod";

export const columnFormSchema = z.object({
  name: z.string().min(1, {
    message: "Column name must be at least 1 character",
  }),
});

export type ColumnFormValues = z.infer<typeof columnFormSchema>;
