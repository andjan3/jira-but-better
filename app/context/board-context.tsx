"use client";
import { createContext, useContext } from "react";
import { AssignedUsers, BoardData, Tasks, Users } from "../types/board-types";

export const BoardContext = createContext<{
  boardData: BoardData;
  tasks: Tasks[];
  assignedUser: AssignedUsers[];
  allUsers: Users[];
}>({
  boardData: {},
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
    allUsers: Users[];
  };
}) {
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
