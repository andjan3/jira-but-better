"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createColumn(boardId: number, name: string) {
  try {
    const convertedBoardID = Number(boardId);

    const boardExists = await db.board.findUnique({
      where: { id: convertedBoardID },
    });

    if (!boardExists) {
      throw new Error("Board not found");
    }

    const existingColumns = await db.column.findMany({
      where: { boardId: convertedBoardID },
    });
    const nextOrder = existingColumns.length;

    const createdColumn = await db.column.create({
      data: {
        title: name,
        boardId: convertedBoardID,
        order: nextOrder,
      },
    });

    revalidatePath(`/boards/${boardId}`);

    return createdColumn;
  } catch (error) {
    throw new Error("Failed to create column");
  }
}
