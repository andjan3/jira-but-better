"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const assignUser = async (
  taskId: number,
  userId: number,
  boardId: number
) => {
  try {
    const userAlreadyAssigned = await prisma.userTask.findUnique({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
    });

    if (!userAlreadyAssigned) {
      await prisma.userTask.create({
        data: {
          userId,
          taskId,
        },
      });
    }

    revalidatePath(`/board/${boardId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to assign user:", error);
    return {
      success: false,
      error: (error as Error).message || "Unknown error occurred",
    };
  }
};
