"use server";

import { db } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteColumn = async (columnId: number, boardId: number) => {
  const column = await db.column.findUnique({
    where: {
      id: columnId,
    },
    include: {
      tasks: true,
    },
  });

  if (!column) {
    return new Error("Column not found!");
  }

  if (column.boardId !== boardId) {
    return new Error("Column does not belong to the specified board");
  }

  await db.task.deleteMany({
    where: {
      columnId: columnId,
    },
  });

  await db.column.delete({
    where: {
      id: columnId,
    },
  });

  revalidatePath(`/boards/${boardId}`);

  return { success: true };
};
