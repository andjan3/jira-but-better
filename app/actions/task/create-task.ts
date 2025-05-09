"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";

export const CreateTask = async (
  message: string,
  columnId: number,
  boardId: number
) => {
  const column = await db.column.findUnique({
    where: { id: columnId },
  });

  if (!column || column.boardId !== boardId) {
    throw new Error("Invalid column or board");
  }

  const maxOrderTask = await db.task.findFirst({
    where: { columnId: columnId },
    orderBy: { order: "desc" },
  });

  const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;

  const createdTask = await db.task.create({
    data: {
      title: message,
      description: "default description",
      isDone: false,
      boardId: boardId,
      columnId: columnId,
      order: newOrder,
    },
  });

  revalidatePath(`/boards/${boardId}`);

  return createdTask;
};
