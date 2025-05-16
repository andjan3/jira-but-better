"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createColumn(boardId: number, name: string) {
  try {
    const convertedBoardID = Number(boardId);

    const boardExists = await prisma.board.findUnique({
      where: { id: convertedBoardID },
    });

    if (!boardExists) {
      throw new Error("Board not found");
    }

    const existingColumns = await prisma.column.findMany({
      where: { boardId: convertedBoardID },
    });
    const nextOrder = existingColumns.length;

    const createdColumn = await prisma.column.create({
      data: {
        title: name,
        boardId: convertedBoardID,
        order: nextOrder,
      },
    });

    revalidatePath(`/board/${boardId}`);

    return createdColumn;
  } catch (error) {
    throw new Error("Failed to create column");
  }
}
