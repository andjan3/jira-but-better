/**
 * RegisterForm component.
 * -----------------------------------
 *
 * A form component for user registration.
 * - Validates input using a Zod schema.
 * - Sends registration data to the server via `registerUser`.
 * - Automatically signs the user in the registration was successful.
 * - Redirects to the dashboard after login.
 */

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "./schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/user/register-user";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";

export const RegisterForm = () => {
  const router = useRouter();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await registerUser(data);

      if (result?.error) {
        toast.error("Registration failed", {
          description: result.error,
        });
        return;
      }

      const loginResult = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (loginResult?.error) {
        toast.error("Login after registration failed");
      } else {
        toast.success("Account created and logged in");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Unexpected error");
      console.error(err);
    }
  };

  return (
    <div className="form-container flex flex-col w-[90%] lg:w-[30%] h-auto mx-auto gap-8">
      <Toaster closeButton />
      <h2 className="text-center text-lg">Sign up</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={methods.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="registerUsername" className="sr-only">
                  Username
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="registerUsername"
                    placeholder="Username"
                  />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="registerEmail" className="sr-only">
                  Email
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="registerEmail"
                    placeholder="E-mail"
                    type="email"
                  />
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
                <label htmlFor="registerPassword" className="sr-only">
                  Password
                </label>
                <FormControl>
                  <Input
                    {...field}
                    id="registerPassword"
                    placeholder="Password"
                    type="password"
                  />
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
            Sign up
          </button>

          <Link href={"/auth/login"} className="toggle-button mx-auto">
            Already have an account? <span className="font-bold">Log in</span>
          </Link>
        </form>
      </FormProvider>
    </div>
  );
};
