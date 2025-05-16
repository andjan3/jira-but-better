"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const CreateTask = async (
  message: string,
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
        title: message,
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
