/**
 * Dashboard
 * -----------------
 * This component renders the main dashboard view.
 *
 * - Passes the data to the DashboardPage component to display:
 *    • The 4 most recent projects
 *    • A summary of tasks assigned to the signed-in user
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { redirect } from "next/navigation";
import { getAllBoards } from "@/app/actions/board/get-all-boards";

export default async function Dashboard() {
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
