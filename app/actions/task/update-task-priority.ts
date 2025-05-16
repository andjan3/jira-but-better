/**
 * Updates the priority of a specific task.
 *
 * @param taskId - The ID of the task to update.
 * @param boardId - The ID of the board the task belongs to (for validation).
 * @param columnId - The ID of the column the task belongs to (for validation).
 * @param priority - The new priority value to set for the task (or null to clear it).
 * @returns An object indicating success or failure, with an optional error message.

 */

"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/app/lib/prisma";
import { Priority } from "@/app/types/board-types";

export const updateTaskPriority = async (
  taskId: number,
  boardId: number,
  columnId: number,
  priority: Priority | null
): Promise<{ success: boolean; error?: string }> => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return { success: false, error: "Task not found" };
    }

    if (task.boardId !== boardId || task.columnId !== columnId) {
      return {
        success: false,
        error: "Task doesn't belong to the specified board or column",
      };
    }

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        priority,
      },
    });

    revalidatePath(`/board/${boardId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating task priority:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};
