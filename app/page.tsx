"use client";
import { Login } from "@/components/session/login";
import { useSession } from "next-auth/react";

export default async function Home() {
  const user = useSession();
  console.log(user.data);
  return <Login />;
}
