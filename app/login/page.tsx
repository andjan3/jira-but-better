"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
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
          toast.error("Invalid email or password", {
            description: "Please check your credentials and try again",
          });
        } else if (result?.ok) {
          toast.success("Login successful");
          router.push("/");
        }
      } else {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error("Registration failed", {
            description: data.error || "Please try again later",
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
          toast.error("Login after registration failed", {
            description: "Please try logging in manually",
          });
        } else {
          toast.success("Account created successfully");
          router.push("/");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later",
      });
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="form-container flex flex-col w-[30%] h-auto mx-auto gap-8 mt-28">
      <Toaster closeButton={true} />

      <h2 className="text-center text-lg">{isLogin ? "Log in" : "Sign up"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        {!isLogin && (
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
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
    </div>
  );
}
