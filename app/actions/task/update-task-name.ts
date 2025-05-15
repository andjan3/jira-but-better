"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskName(
  taskId: number,
  boardId: number,
  taskName: string
): Promise<{
  success: boolean;
  data?: { id: number; title: string };
  error?: string;
}> {
  try {
    const convertedTaskId = Number(taskId);
    const convertedBoardId = Number(boardId);

    if (isNaN(convertedTaskId) || isNaN(convertedBoardId)) {
      return { success: false, error: "Invalid task or board ID" };
    }

    const existingTask = await db.task.findUnique({
      where: { id: convertedTaskId },
    });

    if (!existingTask) {
      return { success: false, error: "Task not found" };
    }

    if (existingTask.boardId !== convertedBoardId) {
      return {
        success: false,
        error: "Task does not belong to the specified board",
      };
    }

    const updatedTask = await db.task.update({
      where: { id: convertedTaskId },
      data: { title: taskName },
    });

    revalidatePath(`/boards/${boardId}`);

    return {
      success: true,
      data: { id: updatedTask.id, title: updatedTask.title },
    };
  } catch (error) {
    console.error("Error updating task name:", error);
    return {
      success: false,
      error: "Something went wrong while updating the task name",
    };
  }
}
