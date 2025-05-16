/**
 * LoginForm component.
 * -----------------------------------
 *
 * A form component for user authentication.
 * - Validates login credentials using a Zod schema.
 * - Uses NextAuth's `signIn` with the "credentials" provider.
 * - Redirects authenticated users to the dashboard.
 */

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { LoginFormValues, logInSchema } from "./schemas/login-schema";
import Link from "next/link";

export const LoginForm = () => {
  const router = useRouter();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Unexpected error");
      console.error(err);
    }
  };

  return (
    <div className="form-container flex flex-col w-[90%] lg:w-[30%] h-auto mx-auto gap-8 ">
      <Toaster closeButton />
      <h2 className="text-center text-lg">Log in</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="E-mail" type="email" />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-black text-white w-auto px-8 p-3 rounded-lg mx-auto hover:bg-[#212121] mt-2"
          >
            Log in
          </button>

          <Link href={"/auth/register"} className="toggle-button mx-auto">
            Wanna join us? <span className="font-bold">Sign up</span>
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};
