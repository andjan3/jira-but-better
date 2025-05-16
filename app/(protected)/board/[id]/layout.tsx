/**
 * BoardLayout
 * ------------
 * This layout is responsible for:
 * - Fetching all necessary data for the board page:
 *    • Board details
 *    • Tasks
 *    • Assigned users
 *    • All users
 * - Providing all the fetched data to child components using BoardContext
 */

import { getAssignedUsers } from "@/app/actions/user-task/get-assigned-users";
import { getBoard } from "@/app/actions/board/get-board";
import { getTasks } from "@/app/actions/task/get-tasks";
import { getUsers } from "@/app/actions/user/get-users";
import { BoardProvider } from "@/app/context/board-context";
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
      {children}
    </BoardProvider>
  );
}
