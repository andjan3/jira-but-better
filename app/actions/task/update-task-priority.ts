"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";
import { Priority } from "@prisma/client";

export const updateTaskPriority = async (
  taskId: number,
  boardId: number,
  columnId: number,
  priority: Priority | null
): Promise<{ success: boolean; error?: string }> => {
  try {
    const task = await db.task.findUnique({
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

    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        priority,
      },
    });

    revalidatePath(`/boards/${boardId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating task priority:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};
