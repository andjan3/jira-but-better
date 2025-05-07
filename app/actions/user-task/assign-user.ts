"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";

export const assignUser = async (
  taskId: number,
  userId: number,
  boardId: number
) => {
  const userAlreadyAssigned = await db.userTask.findUnique({
    where: {
      userId_taskId: {
        userId,
        taskId,
      },
    },
  });

  if (!userAlreadyAssigned) {
    await db.userTask.create({
      data: {
        userId,
        taskId,
      },
    });
  }

  revalidatePath(`/boards/${boardId}`);
  return { success: true };
};
