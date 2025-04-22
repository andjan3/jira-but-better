import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { CreateBoard } from "@/components/ui/create-board";
import { getBoards } from "./lib/get-boards";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const boards = await getBoards();

  return (
    <>
      {session && session.user?.name && (
        <div className="w-full flex justify-center mt-[130px] relative z-20">
          <CreateBoard />
        </div>
      )}
    </>
  );
}
