"use server";
import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";

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

  const createdTask = await db.task.create({
    data: {
      title: message,
      description: "default description",
      isDone: false,
      boardId: boardId,
      columnId: columnId,
    },
  });

  revalidatePath(`/boards/${boardId}`);

  return createdTask;
};
