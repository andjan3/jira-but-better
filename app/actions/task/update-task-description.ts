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
    revalidatePath(`/boards/${boardId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating task description:", error);

    return {
      success: false,
      error: "Something went wrong while updating the task description",
    };
  }
};
