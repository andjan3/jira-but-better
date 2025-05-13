"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";

export const updateBoardName = async (boardId: number, newTitle: string) => {
  const convertedBoardId = Number(boardId);

  const existingBoard = await db.board.findUnique({
    where: { id: convertedBoardId },
  });

  if (!existingBoard) {
    throw new Error("Board not found");
  }

  const updatedBoard = await db.board.update({
    where: { id: convertedBoardId },
    data: { name: newTitle },
  });

  revalidatePath(`/boards/${boardId}`);

  return updatedBoard;
};
