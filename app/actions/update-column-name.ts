"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";

export async function updateColumnName(params: {
  columnId: string;
  boardId: string;
  columnName: string;
}) {
  const { boardId, columnName, columnId } = params;

  const convertedColumnId = parseInt(columnId);
  const convertedBoardId = parseInt(boardId);

  const existingColumn = await db.column.findUnique({
    where: { id: convertedColumnId },
  });

  if (!existingColumn) {
    throw new Error("Column not found");
  }

  if (existingColumn.boardId !== convertedBoardId) {
    throw new Error("Column does not belong to the specified board");
  }

  const updatedColumn = await db.column.update({
    where: { id: convertedColumnId },
    data: { title: columnName, order: existingColumn.order },
  });

  revalidatePath(`/boards/${boardId}`);

  return updatedColumn;
}
