/**
 * Creates a new column for a specific board.
 *
 * @param boardId - The ID of the board to which the column belongs.
 * @param name - The name/title of the new column.
 * @returns The newly created column object.
 * @throws Throws an error if the board doesn't exist or the creation fails.
 */

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
