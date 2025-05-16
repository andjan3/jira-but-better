/**
 * AddTaskForm component.
 * -----------------------------------
 *
 * A form component for creating a new task.
 * - Validates input using a Zod schema.
 * - Trims whitespace to prevent empty submissions.
 * - Sends the task to the server by the `CreateTask` function on submit.
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { TaskFormSchema } from "./schemas/tasks-schema";
import { CreateTask } from "@/app/actions/task/create-task";

interface TaskFormProps {
  columnId: number;
  boardId: number;
}

export function AddTaskForm({ columnId, boardId }: TaskFormProps) {
  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof TaskFormSchema>) {
    const trimmedMessage = values.message.trim();

    if (!trimmedMessage) {
      toast("Task message cannot be empty or only spaces.");
      return;
    }
    try {
      const response = await CreateTask(trimmedMessage, columnId, boardId);
      if (response) {
        form.reset();

        toast.message("Task added!", {
          description: "Your task has been successfully added.",
        });
      }
    } catch (error) {
      console.error("Error sending message.", error);
      toast("Something went wrong!");
    }
  }

  return (
    <div className="w-[100%] ">
      <Toaster closeButton={true} />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} placeholder="Add task.." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="!mt-4">
              Add task
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
