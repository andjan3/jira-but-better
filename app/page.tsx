import { authOptions } from "@/auth";
import { Login } from "@/components/session/login";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { User } from "./user";
import { LoginButton, LogoutButton } from "./auth";

export default async function Home() {
  // const user = useSession();
  const session = await getServerSession(authOptions);

  //RETURN
  {
    /* <Login /> */
  }

  return (
    <>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>

      <h2>Client session</h2>
      <User />
    </>
  );
}
