"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateBoardName = async (boardId: number, newTitle: string) => {
  try {
    const convertedBoardId = Number(boardId);

    const existingBoard = await prisma.board.findUnique({
      where: { id: convertedBoardId },
    });

    if (!existingBoard) {
      throw new Error("Board not found");
    }

    const updatedBoard = await prisma.board.update({
      where: { id: convertedBoardId },
      data: { name: newTitle },
    });

    revalidatePath(`/board/${boardId}`);

    return updatedBoard;
  } catch (error) {
    throw new Error("Failed to update board name");
  }
};
