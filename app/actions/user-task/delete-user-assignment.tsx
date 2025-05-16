/**
 * Removes the assignment of a user from a specific task.
 *
 * @param taskId - The ID of the task from which the user assignment will be removed.
 * @param userId - The ID of the user whose assignment is to be deleted.
 * @param boardId - The ID of the board for cache revalidation purposes.
 * @returns An object indicating whether the deletion was successful or if an error occurred.
 
 */

"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteUserAssignment = async (
  taskId: number,
  userId: number,
  boardId: number
) => {
  try {
    const userTask = await prisma.userTask.findUnique({
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

    await prisma.userTask.delete({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
    });

    revalidatePath(`/board/${boardId}`);

    return { success: true };
  } catch (error) {
    console.error("Error in deleteUserAssignment:", error);
    return { success: false, error: (error as Error).message };
  }
};
