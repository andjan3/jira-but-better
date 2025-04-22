import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { UserIcon } from "../user-icon";

export const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="bg-black h-[100px] w-full flex items-center p-4 px-10 justify-between fixed top-0 left-0 right-0 z-10">
      <div>
        <a href={"/"} className="text-white">
          Jira but better
        </a>
      </div>

      {session && session.user?.name && (
        <div className="text-white">{`Welcome: ${session.user.name}`}</div>
      )}

      <UserIcon props={session ? true : false} />
    </nav>
  );
};
