/**
 * Updates the tasks name  by its ID.
 *
 * @param taskId - The ID of the task to update.
 * @param boardId - The ID of the board the task belong to (for validation).
 * @param taskName - The new name for the task.
 *  @returns An object indicating success or failure of the operation.
 */

"use server";

import prisma from "@/app/lib/prisma";
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

    const existingTask = await prisma.task.findUnique({
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

    const updatedTask = await prisma.task.update({
      where: { id: convertedTaskId },
      data: { title: taskName },
    });

    revalidatePath(`/board/${boardId}`);

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
