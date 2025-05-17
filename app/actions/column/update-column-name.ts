/**
 * Updates the name of a specific column by its ID.
 *
 * @param columnId - The ID of the column to update.
 * @param columnName - The new name/title for the column.
 * @param boardId - The ID of the board the column should belong to (for validation).
 * @returns The updated column object.
 * @throws Throws an error if the update fails.
 */

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
