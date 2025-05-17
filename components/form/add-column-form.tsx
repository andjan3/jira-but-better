/**
 * AddColumnForm component.
 * -----------------------------------
 *
 * A form component for adding a new column to a board.
 * - Validates the column name using a Zod schema.
 * - Sends a request to the server via `createColumn` on submission.
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IoIosCloseCircleOutline } from "react-icons/io";
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

export function AddColumnForm({
  boardId,
  onCancel,
}: {
  boardId: number | undefined;
  onCancel: () => void;
}) {
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
    <div className="[100%] p-2 lg:p-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="addColumnName" className="sr-only">
                  Add column name
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="addColumnName"
                    placeholder="Add column name.."
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2 ">
            <Button type="submit">Add column</Button>
            <button
              className="cursor-pointer pt-4 lg:pt-0 text-[45px] lg:text-[30px]"
              onClick={onCancel}
            >
              <IoIosCloseCircleOutline aria-label="Close form for adding column to board" />
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
