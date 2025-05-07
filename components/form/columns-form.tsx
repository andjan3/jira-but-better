"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { columnFormSchema, ColumnFormValues } from "./schemas/columns-schema";
import { createColumn } from "@/app/actions/column/create-column";

export function ColumnForm({ boardId }: { boardId: number | undefined }) {
  const form = useForm<ColumnFormValues>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: ColumnFormValues) => {
    if (boardId === undefined) {
      return;
    }
    try {
      const column = await createColumn(boardId, values.name);

      form.reset();
      toast.success("Column added successfully!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-[100%]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Add column name.." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add column</Button>
        </form>
      </Form>
    </div>
  );
}
