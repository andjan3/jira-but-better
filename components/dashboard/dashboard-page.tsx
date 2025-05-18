/**
 * DashboardPage component.
 * ------------------------
 *
 * Renders the main dashboard view for a logged-in user.
 *
 * Features:
 * - Displays a personalized welcome message using the user's session data.
 * - Shows a list of latest projects (boards) by the `LatestProjects` component.
 * - Includes a summary of tasks relevant to the user by the`TaskSummery` component.
 *
 */

import { Board } from "@/app/types/board-types";
import { LatestProjects } from "./latest-projects";
import { Session } from "next-auth";
import { TaskSummery } from "./task-summery";

interface DashboardPageProps {
  boards: Board[];
  session: Session;
}
export const DashboardPage = ({ boards, session }: DashboardPageProps) => {
  return (
    <section className="flex flex-col w-[85%] lg:w-[92%] mx-auto gap-5 my-10 mt-20 lg:mt-40">
      <div className="flex flex-col lg:items-center lg:mr-[8rem]">
        {session?.user?.name && (
          <div className="flex text-xl gap-2 text-center">
            <span>👋</span>
            <h1>{`Welcome ${session.user.name}`}</h1>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-20">
        <LatestProjects boards={boards} />
        <hr className="mt-5"></hr>
        <TaskSummery session={session} />
      </div>
    </section>
  );
};
