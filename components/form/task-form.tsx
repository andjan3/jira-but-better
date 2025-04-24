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
import { formSchema } from "./schemas/form-schema";
import { Textarea } from "../ui/textarea";

export function TaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`http://localhost:3000/api/dashboard/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        form.reset();

        toast("Column added", {
          style: {
            height: "10vh",
            width: "30vw",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            fontSize: "18px",
          },
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
          <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
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
