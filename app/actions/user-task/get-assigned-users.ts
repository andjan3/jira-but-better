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

    revalidatePath(`/boards/${boardId}`);
    return assignedUsers;
  } catch (error) {
    console.error("Failed to get user-task assignment", error);
    return [];
  }
};
