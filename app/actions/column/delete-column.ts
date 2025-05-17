/**
 * Deletes a column by its ID, along with all related user-task relations,
 * tasks, and columns.
 *
 * @param columnId - The ID of the column to delete.
 * @param boardId - The ID of the board the column should belong to (for validation).
 * @returns An object indicating success or failure of the operation.
 */

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
