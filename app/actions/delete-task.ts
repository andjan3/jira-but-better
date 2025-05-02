"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";

export const deleteTask = async (taskId: any, boardId: any, columnId: any) => {
  const task = await db.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    return new Error("Task not found!");
  }

  if (task.boardId !== boardId || task.columnId !== columnId) {
    return new Error("Task dosent belong to this board or column");
  }

  await db.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath(`/boards/${boardId}`);
  return { success: true };
};
