"use cli";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { User } from "./user";
import { LoginButton, LogoutButton } from "./auth";
import { FaRegUser } from "react-icons/fa6";
import { UserIcon } from "@/components/ui/user-icon";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-black h-[100px] w-full flex items-center p-4">
      <div className="grid grid-cols-3 w-full">
        <div className="text-white">Jira but better</div>
      </div>

      <UserIcon />

      {/* <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>

      <h2>Client session</h2> */}
      <User />
    </nav>
  );
}
