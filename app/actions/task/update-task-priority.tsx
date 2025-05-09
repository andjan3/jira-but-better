"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";
import { Priority } from "@prisma/client";

export const updateTaskPriority = async (
  taskId: number,
  boardId: number,
  columnId: number,
  priority: Priority | null
) => {
  const task = await db.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new Error("Task not found!");
  }

  if (task.boardId !== boardId || task.columnId !== columnId) {
    throw new Error("Task doesn't belong to this board or column");
  }

  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      priority: priority,
    },
  });

  revalidatePath(`/boards/${boardId}`);
  return { success: true };
};
