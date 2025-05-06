"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";

export const assignUser = async (
  taskId: number,
  userId: number,
  boardId: number
) => {
  const existing = await db.userTask.findUnique({
    where: {
      userId_taskId: {
        userId,
        taskId,
      },
    },
  });

  if (!existing) {
    await db.userTask.create({
      data: {
        userId,
        taskId,
      },
    });
  }

  revalidatePath(`/boards/${boardId}`);
};
