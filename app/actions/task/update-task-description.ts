"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";
import { Priority } from "@prisma/client";

export const updateTaskDescription = async (
  taskId: number,
  boardId: number,
  columnId: number,
  description: string
) => {
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

  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      description: description,
    },
  });

  revalidatePath(`/boards/${boardId}`);
  return { success: true };
};
