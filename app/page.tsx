import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { UserIcon } from "@/components/ui/user-icon";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav className="bg-black h-[100px] w-full flex flex-row items-center p-4 px-10 justify-between">
        <div>
          <div className="text-white">Jira but better</div>
        </div>

        {session && session.user?.name && (
          <div className="text-white">{`Welcome: ${session.user.name}`}</div>
        )}

        <UserIcon props={session ? true : false} />
      </nav>
    </>
  );
}
