"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { LoginFormValues, logInSchema } from "./schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
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
      <h2 className="text-center text-lg">Log in</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input
          type="email"
          {...register("email")}
          placeholder="E-mail"
          className={errors.email ? "border border-red-500" : ""}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className={errors.password ? "border border-red-500" : ""}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <button
          type="submit"
          className="bg-black text-white w-auto px-10 p-4 rounded-lg mx-auto hover:bg-[#212121] mt-2"
        >
          Log in
        </button>

        <button
          type="button"
          onClick={() => router.push("/auth/register")}
          className="toggle-button"
        >
          Wanna join us? <span className="font-bold">Sign up</span>
        </button>
      </form>
    </div>
  );
};
