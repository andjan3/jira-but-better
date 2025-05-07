"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "./schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/register-user";

export const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
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
        router.push("/");
      }
    } catch (err) {
      toast.error("Unexpected error");
      console.error(err);
    }
  };

  return (
    <div className="form-container flex flex-col w-[30%] h-auto mx-auto gap-8 ">
      <Toaster closeButton />
      <h2 className="text-center text-lg">Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input type="text" {...register("username")} placeholder="Username" />
        <input type="email" {...register("email")} placeholder="E-mail" />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-black text-white w-auto px-10 p-4 rounded-lg mx-auto hover:bg-[#212121] mt-2"
        >
          Sign up
        </button>

        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="toggle-button"
        >
          Already have an account? <span className="font-bold">Log in</span>
        </button>
      </form>
    </div>
  );
};
