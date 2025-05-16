"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateColumnName(
  columnId: number,
  boardId: number,
  columnName: string
) {
  try {
    const convertedColumnId = Number(columnId);
    const convertedBoardId = Number(boardId);

    const existingColumn = await prisma.column.findUnique({
      where: { id: convertedColumnId },
    });

    if (!existingColumn) {
      throw new Error("Column not found");
    }

    if (existingColumn.boardId !== convertedBoardId) {
      throw new Error("Column does not belong to the specified board");
    }

    const updatedColumn = await prisma.column.update({
      where: { id: convertedColumnId },
      data: { title: columnName, order: existingColumn.order },
    });

    revalidatePath(`/board/${boardId}`);

    return updatedColumn;
  } catch (error) {
    throw new Error("Failed to update column");
  }
}
