/**
 * ChangePasswordForm component
 * -----------------------------------
 *
 * A form component for allowing users to change their password.
 * - Validates user input using a Zod schema.
 * - Confirms that password and confirmation match.
 * - Sends a password update request via the `changePassword` action.
 */

"use client";

import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "./schemas/change-password";
import { changePassword } from "@/app/actions/user/change-password";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const ChangePasswordForm = () => {
  const { data: session } = useSession();

  const methods = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      controlPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    if (!session?.user.id) {
      toast.error("No user session found");
      return;
    }

    try {
      const result = await changePassword({
        newPassword: values.password,
        userId: Number(session.user.id),
      });

      if (result?.error) {
        toast.error("Failed to change password", {
          description: result.error,
        });
      } else {
        toast.success("Successfully changed password!");
        methods.reset();
      }
    } catch (err) {
      toast.error("Unexpected error");
      console.error(err);
    }
  };

  return (
    <div className="my-5  w-[90%] lg:w-[30%] gap-8">
      <Toaster closeButton />
      <p className="text-sm italic mb-2 ml-2">Set new password</p>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="newPassword" className="sr-only">
                  New password
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="newPassword"
                    placeholder="New password"
                    type="password"
                    className="w-[300px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="controlPassword"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm password
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    type="password"
                    className="w-[300px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="bg-black text-white lg:py-2 rounded-lg hover:bg-[#212121] mt-2 lg:w-[45%] text-sm w-[300px] py-3"
          >
            Change password
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
