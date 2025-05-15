"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteUserAssignment = async (
  taskId: number,
  userId: number,
  boardId: number
) => {
  try {
    const userTask = await db.userTask.findUnique({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
    });

    if (!userTask) {
      throw new Error("User-task assignment not found");
    }

    await db.userTask.delete({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
    });

    revalidatePath(`/boards/${boardId}`);

    return { success: true };
  } catch (error) {
    console.error("Error in deleteUserAssignment:", error);
    return { success: false, error: (error as Error).message };
  }
};
