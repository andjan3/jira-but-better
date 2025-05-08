"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";

export const deleteUserAssignment = async (
  taskId: number,
  userId: number,
  boardId: number
) => {
  const userTask = await db.userTask.findUnique({
    where: {
      userId_taskId: {
        userId,
        taskId,
      },
    },
  });

  if (userTask) {
    await db.userTask.delete({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
    });
  }

  revalidatePath(`/boards/${boardId}`);
  return { success: true };
};
