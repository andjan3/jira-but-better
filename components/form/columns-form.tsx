"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
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
import { createColumnInBoard } from "@/app/actions/board";

export function ColumnForm({ id }: { id: number | undefined }) {
  if (id === undefined) {
    return <div>Error: No board ID provided</div>;
  }

  const form = useForm<ColumnFormValues>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: ColumnFormValues) => {
    try {
      const column = await createColumnInBoard({
        boardId: id,
        name: values.name,
      });

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
