import { getAssignedUsers } from "@/app/actions/user-task/get-assigned-users";
import { getBoard } from "@/app/actions/board/get-board";
import { getTasks } from "@/app/actions/task/get-tasks";
import { getUsers } from "@/app/actions/user/get-users";
import { BoardProvider } from "@/app/context/board-context";

import { SideBar } from "@/components/sidebar/sidebar";

import { notFound } from "next/navigation";

export default async function BoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const boardId = Number(params.id);

  if (isNaN(boardId)) notFound();

  const [boardData, tasks, assignedUser, allUsers] = await Promise.all([
    getBoard(boardId),
    getTasks(),
    getAssignedUsers(boardId),
    getUsers(),
  ]);

  if (!boardData) notFound();

  return (
    <BoardProvider value={{ boardData, tasks, assignedUser, allUsers }}>
      <div className="grid grid-cols-[300px_1fr]">
        <SideBar />
        {children}
      </div>
    </BoardProvider>
  );
}
