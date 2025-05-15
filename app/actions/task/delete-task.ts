"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteTask = async (
  taskId: number,
  boardId: number,
  columnId: number
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
    await prisma.userTask.deleteMany({
      where: { taskId },
    });

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    revalidatePath(`/boards/${boardId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating task priority:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};
