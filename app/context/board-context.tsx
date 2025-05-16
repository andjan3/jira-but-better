/**
 * BoardContext
 * -----------------
 * Provides a shared context for board-related data, primarily across board-components.
 *
 * Includes:
 * - `boardData`: data about the current board (e.g., id, name).
 * - `tasks`: All tasks associated with the current board.
 * - `assignedUser`: A list of task-user assignments.
 * - `allUsers`: A list of all users.
 */

"use client";
import { createContext, useContext } from "react";
import { AssignedUsers, BoardData, Tasks, User } from "../types/board-types";

export const BoardContext = createContext<{
  boardData: BoardData;
  tasks: Tasks[];
  assignedUser: AssignedUsers[];
  allUsers: User[];
}>({
  boardData: { id: 0 },
  tasks: [],
  assignedUser: [],
  allUsers: [],
});

export function useBoard() {
  return useContext(BoardContext);
}

export function BoardProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: {
    boardData: BoardData;
    tasks: Tasks[];
    assignedUser: AssignedUsers[];
    allUsers: User[];
  };
}) {
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
