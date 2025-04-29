"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { registerUser } from "@/app/actions/register-user";

export const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          username,
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          toast.error("Invalid email or password");
        } else {
          toast.success("Login successful");
          router.push("/");
        }
      } else {
        const result = await registerUser({ username, email, password });

        if (result?.error) {
          toast.error("Registration failed", {
            description: result.error,
          });
          return;
        }
        const loginResult = await signIn("credentials", {
          username,
          email,
          password,
          redirect: false,
        });

        if (loginResult?.error) {
          toast.error("Login after registration failed");
        } else {
          toast.success("Account created and logged in");
          router.push("/");
        }
      }
    } catch (err) {
      toast.error("Unexpected error");
      console.error(err);
    }
  };

  return (
    <div className="form-container flex flex-col w-[30%] h-auto mx-auto gap-8 mt-28 relative z-30">
      <Toaster closeButton />
      <h2 className="text-center text-lg">{isLogin ? "Log in" : "Sign up"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {!isLogin && (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="bg-black text-white w-auto px-10 p-4 rounded-lg mx-auto hover:bg-[#212121] mt-2"
        >
          {isLogin ? "Log in" : "Sign up"}
        </button>

        <button
          onClick={() => router.push(isLogin ? "/register" : "/login")}
          className="toggle-button"
        >
          {isLogin ? (
            <>
              Wanna join us? <span className="font-bold">Sign up</span>
            </>
          ) : (
            <>
              Already have an account? <span className="font-bold">Log in</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
