"use server";

import { db } from "@/app/lib/prisma";
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
    const tasksInColumn = await db.task.findMany({
      where: {
        boardId,
        columnId: newColumnId,
      },
      orderBy: { order: "asc" },
    });

    const taskToMove = await db.task.findUnique({
      where: { id: taskId },
    });

    if (!taskToMove) {
      return { success: false, error: "Task not found" };
    }

    const otherTasks = tasksInColumn.filter((task) => task.id !== taskId);

    const updatedTasks = [
      ...otherTasks.slice(0, newIndex),
      taskToMove,
      ...otherTasks.slice(newIndex),
    ];

    const updates = updatedTasks.map((task, idx) => {
      const newOrder = (idx + 1) * 10;
      return db.task.update({
        where: { id: task.id },
        data: {
          columnId: newColumnId,
          order: newOrder,
        },
      });
    });

    await db.$transaction(updates);

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

async function normalizeTaskOrderValues(columnId: number, boardId: number) {
  const tasks = await db.task.findMany({
    where: {
      boardId,
      columnId,
    },
    orderBy: { order: "asc" },
  });

  const updates = tasks.map((task, index) => {
    return db.task.update({
      where: { id: task.id },
      data: { order: index + 1 },
    });
  });

  await db.$transaction(updates);

  revalidatePath(`/board/${boardId}`);
}
