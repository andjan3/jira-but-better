import { revalidatePath } from "next/cache";
import { db } from "../../lib/prisma";

export const getAssignedUsers = async (boardId: number) => {
  const assignedUsers = await db.userTask.findMany({
    include: {
      user: true,
    },
  });

  revalidatePath(`/boards/${boardId}`);

  return assignedUsers;
};
