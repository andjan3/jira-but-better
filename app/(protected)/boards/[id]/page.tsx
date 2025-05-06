import { getBoard } from "@/app/actions/board";
import { getAssignedUsers } from "@/app/actions/get-assigned-users";
import { getTasks } from "@/app/actions/get-tasks";
import { getUsers } from "@/app/actions/get-users";
import { Column } from "@/components/board/column";
import { Nav } from "@/components/header/nav";
import { SideBar } from "@/components/sidebar/sidebar";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function BoardPage({ params }: Props) {
  try {
    const boardId = Number(params.id);

    if (isNaN(boardId)) {
      return notFound();
    }

    const boardData = await getBoard(boardId);
    const tasks = await getTasks();
    const assignedUser = await getAssignedUsers(boardId);

    if (!boardData) {
      return notFound();
    }

    return (
      <div>
        <Nav />
        <div className="grid grid-cols-[300px_1fr]">
          <SideBar />
          <Column res={boardData} tasks={tasks} assignedUser={assignedUser} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading board:", error);
    return <div>Error loading board. Please try again later.</div>;
  }
}
