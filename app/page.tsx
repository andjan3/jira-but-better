import { getServerSession } from "next-auth";
import { getAllBoards } from "./actions/board/get-all-boards";
import { authOptions } from "@/auth";
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export default async function Home() {
  try {
    const [boards, session] = await Promise.all([
      getAllBoards(),
      getServerSession(authOptions),
    ]);

    if (session == null) {
      return;
    }

    return <DashboardPage boards={boards} session={session} />;
  } catch (error) {
    return <div>Error loading dashboard.</div>;
  }
}
