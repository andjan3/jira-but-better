"use server";

import { revalidatePath } from "next/cache";
import { Priority } from "@prisma/client";
import prisma from "@/app/lib/prisma";

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
