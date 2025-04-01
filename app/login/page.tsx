"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) router.push("/");
    } else {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      if (res.ok) {
        await signIn("credentials", {
          username,
          email,
          password,
          redirect: false,
        });
        router.push("/");
      }
    }
  };

  return (
    <div className="form-container flex flex-col w-[30%] h-auto mx-auto gap-8 mt-28">
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
