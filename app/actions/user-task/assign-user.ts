/**
 * Assigns a user to a specific task if not already assigned.
 *
 * @param taskId - The ID of the task to assign the user to.
 * @param userId - The ID of the user to assign.
 * @param boardId - The ID of the board (used for cache revalidation).
 * @returns An object indicating success or failure of the assignment operation.
 *
 */

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
