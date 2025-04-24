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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./schemas/form-schema";

export function ColumnForm({ boardId }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/dashboard/${boardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
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
    <div className="w-[100%] mt-5">
      <Toaster closeButton={true} />
      <div className="flex flex-col items-end -mt-5 lg:mt-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 my-14 lg:w-[80%] flex flex-col gap-4"
          >
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Column name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start">
              <Button type="submit">Add column</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
