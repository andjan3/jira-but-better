/**
 * Creates a new task in the specified column and board.
 *
 * @param name - The name of the task.
 * @param columnId - The ID of the column the task belongs to.
 * @param boardId - The ID of the board the column is part of.
 * @returns The newly created task object.
 * @throws Error if the column is invalid or the task creation fails.
 */

"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const CreateTask = async (
  name: string,
  columnId: number,
  boardId: number
) => {
  try {
    const column = await prisma.column.findUnique({
      where: { id: columnId },
    });

    if (!column || column.boardId !== boardId) {
      throw new Error("Invalid column or board");
    }

    const maxOrderTask = await prisma.task.findFirst({
      where: { columnId: columnId },
      orderBy: { order: "desc" },
    });

    const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;

    const createdTask = await prisma.task.create({
      data: {
        title: name,
        description: "default description",
        isDone: false,
        boardId: boardId,
        columnId: columnId,
        order: newOrder,
      },
    });

    revalidatePath(`/board/${boardId}`);

    return createdTask;
  } catch (error) {
    throw new Error("Faild to create task");
  }
};
