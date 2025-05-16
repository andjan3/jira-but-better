import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { redirect } from "next/navigation";
import { getAllBoards } from "@/app/actions/board/get-all-boards";

export default async function Home() {
  try {
    const [boards, session] = await Promise.all([
      getAllBoards(),
      getServerSession(authOptions),
    ]);

    if (!session) {
      redirect("/auth/login");
    }

    return <DashboardPage boards={boards} session={session} />;
  } catch (error) {
    return <div>Error loading dashboard.</div>;
  }
}
