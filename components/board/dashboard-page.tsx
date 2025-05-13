import { Board } from "@/app/types/board-types";
import { Nav } from "../header/nav";
import { LatestProjects } from "../latest-projects";
import { SideBar } from "../sidebar/sidebar";
import { Session } from "next-auth";
import { TaskSummery } from "../task-summery";

interface DashboardPageProps {
  boards: Board[];
  session: Session;
}
export const DashboardPage = ({ boards, session }: DashboardPageProps) => {
  return (
    <div>
      {/*  <Nav /> */}
      <div className="grid grid-cols-[18%_1fr]">
        <SideBar />
        <div className="flex flex-col w-[85%] mx-auto gap-5 my-10 mt-20">
          <div className="flex flex-col items-center">
            {session?.user?.name && (
              <div className="flex text-xl gap-2 text-center">
                <span>👋</span>
                <span>{`Welcome ${session.user.name}`}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-20">
            <LatestProjects boards={boards} />
            <hr className="mt-5"></hr>
            <TaskSummery session={session} />
          </div>
        </div>
      </div>
    </div>
  );
};
