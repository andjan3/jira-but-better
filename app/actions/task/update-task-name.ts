"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";

export async function updateTaskName(
  taskId: number,
  boardId: number,
  taskName: string
) {
  const convertedTaskId = Number(taskId);
  const convertedBoardId = Number(boardId);

  const existingTask = await db.task.findUnique({
    where: { id: convertedTaskId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  if (existingTask.boardId !== convertedBoardId) {
    throw new Error("Task does not belong to the specified board");
  }

  const updatedTask = await db.task.update({
    where: { id: convertedTaskId },
    data: { title: taskName },
  });

  revalidatePath(`/boards/${boardId}`);

  return updatedTask;
}
