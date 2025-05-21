/**
 * updateTaskOrder
 * -------------------
 * Reorders a task within a column or moves it to a new column.
 * Updates the order values of all tasks in the target column.
 * After updating, uses normalizeTaskOrder to reset all order values 
 * to simple numbering (1, 2, 3...) in the target column.
 * 
 * @param taskId - The ID of the task to move.
 * @param newColumnId - The ID of the column where the task is being moved.
 * @param newIndex - The position in the column where the task should be inserted.
 * @param boardId - The ID of the board for context/validation.
 * @returns An object indicating success or failure.

 */

"use server";

import prisma from "@/app/lib/prisma";
import type { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTaskOrder = async ({
  taskId,
  newColumnId,
  newIndex,
  boardId,
}: {
  taskId: number;
  newColumnId: number;
  newIndex: number;
  boardId: number;
}) => {
  try {
    const tasksInColumn = await prisma.task.findMany({
      where: {
        boardId,
        columnId: newColumnId,
      },
      orderBy: { order: "asc" },
    });

    const taskToMove = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!taskToMove) {
      return { success: false, error: "Task not found" };
    }

    const otherTasks = tasksInColumn.filter((task: Task) => task.id !== taskId);

    const updatedTasks = [
      ...otherTasks.slice(0, newIndex),
      taskToMove,
      ...otherTasks.slice(newIndex),
    ];

    const updates = updatedTasks.map((task: Task, idx: any) => {
      const newOrder = (idx + 1) * 10;
      return prisma.task.update({
        where: { id: task.id },
        data: {
          columnId: newColumnId,
          order: newOrder,
        },
      });
    });

    await prisma.$transaction(updates);

    await normalizeTaskOrderValues(newColumnId, boardId);

    return { success: true };
  } catch (error) {
    console.error("Error updating task order:", error);
    return {
      success: false,
      error: "Something went wrong while updating the task order",
    };
  }
};

/**
 * normalizeTaskOrderValues
 * ---------------------------
 * Ensures that all tasks in a given column have sequential `order` values,
 * starting from 1 and increasing by 1.
 *
 * This helps maintain consistent ordering after task movements.
 **/

async function normalizeTaskOrderValues(columnId: number, boardId: number) {
  const tasks = await prisma.task.findMany({
    where: {
      boardId,
      columnId,
    },
    orderBy: { order: "asc" },
  });

  const updates = tasks.map((task: Task, index: number) => {
    return prisma.task.update({
      where: { id: task.id },
      data: { order: index + 1 },
    });
  });

  await prisma.$transaction(updates);

  revalidatePath(`/board/${boardId}`);
}
