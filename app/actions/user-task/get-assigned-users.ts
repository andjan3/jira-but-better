import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const getAssignedUsers = async (boardId?: number) => {
  try {
    const assignedUsers = await db.userTask.findMany({
      include: {
        user: true,
        task: true,
      },
    });

    revalidatePath(`/boards/${boardId}`);
    return assignedUsers;
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    return [];
  }
};
