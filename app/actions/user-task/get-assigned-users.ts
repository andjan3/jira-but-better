/**
 * Gets all user-task assignments, including related user and task details.
 *
 * @param boardId - Optional ID of the board for cache revalidation.
 * @returns An array of user-task assignment objects, each including user and task information. Returns an empty array if the fetch operation fails.
 
 */

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const getAssignedUsers = async (boardId?: number) => {
  try {
    const assignedUsers = await prisma.userTask.findMany({
      include: {
        user: true,
        task: true,
      },
    });

    revalidatePath(`/board/${boardId}`);
    return assignedUsers;
  } catch (error) {
    console.error("Failed to get user-task assignment", error);
    return [];
  }
};
