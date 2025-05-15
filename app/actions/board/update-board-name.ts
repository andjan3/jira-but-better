"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateBoardName = async (boardId: number, newTitle: string) => {
  try {
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
  } catch (error) {
    throw new Error("Failed to update board name");
  }
};
