"use server";
import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";

export const CreateTask = async (
  message: string,
  columnId: number,
  boardId: number
) => {
  const createdTask = await db.task.create({
    data: {
      title: message,
      description: "default description",
      isDone: false,
      columnId: columnId,
    },
  });

  revalidatePath(`/boards/${boardId}`);

  return createdTask;
};
