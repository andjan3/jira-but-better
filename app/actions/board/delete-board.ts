"use server";

import { db } from "@/app/lib/prisma";

export async function deleteBoard(boardId: number) {
  try {
    const tasks = await db.task.findMany({
      where: { boardId },
      select: { id: true },
    });

    const taskIds = tasks.map((task) => task.id);

    await db.userTask.deleteMany({
      where: {
        taskId: { in: taskIds },
      },
    });

    await db.task.deleteMany({
      where: { boardId },
    });

    await db.column.deleteMany({
      where: { boardId },
    });

    await db.board.delete({
      where: { id: boardId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting board:", error);
    return { success: false, error: "Failed to delete board." };
  }
}
