/**
 * Updates the tasks description  by its ID.
 *
 * @param taskId - The ID of the task to update.
 * @param boardId - The ID of the board the task belong to (for validation).
 * @param columnId - The ID of the column that the task belong to (for validation).
 * @param description - The new description for the task.
 *  @returns An object indicating success or failure of the operation.
 */

"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateTaskDescription = async (
  taskId: number,
  boardId: number,
  columnId: number,
  description: string
) => {
  try {
    const task = await prisma.task.findUnique({
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

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        description: description,
      },
    });
    revalidatePath(`/board/${boardId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating task description:", error);

    return {
      success: false,
      error: "Something went wrong while updating the task description",
    };
  }
};
