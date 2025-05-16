"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Task } from "@prisma/client";

export const deleteColumn = async (columnId: number, boardId: number) => {
  try {
    const column = await prisma.column.findUnique({
      where: {
        id: columnId,
      },
      include: {
        tasks: true,
      },
    });

    if (!column) {
      return new Error("Column not found!");
    }

    if (column.boardId !== boardId) {
      return new Error("Column does not belong to the specified board");
    }

    const taskIds = column.tasks.map((task: Task) => task.id);

    await prisma.userTask.deleteMany({
      where: {
        taskId: { in: taskIds },
      },
    });

    await prisma.task.deleteMany({
      where: {
        id: { in: taskIds },
      },
    });

    await prisma.column.delete({
      where: {
        id: columnId,
      },
    });

    revalidatePath(`/board/${boardId}`);

    return { success: true };
  } catch (error) {
    console.error("Delete column error:", error);
    return {
      success: false,
      error: "Something went wrong while deleting column",
    };
  }
};
