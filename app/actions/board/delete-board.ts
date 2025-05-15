"use server";

import prisma from "@/app/lib/prisma";

export async function deleteBoard(boardId: number) {
  try {
    const tasks = await prisma.task.findMany({
      where: { boardId },
      select: { id: true },
    });

    const taskIds = tasks.map((task) => task.id);

    await prisma.userTask.deleteMany({
      where: {
        taskId: { in: taskIds },
      },
    });

    await prisma.task.deleteMany({
      where: { boardId },
    });

    await prisma.column.deleteMany({
      where: { boardId },
    });

    await prisma.board.delete({
      where: { id: boardId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting board:", error);
    return { success: false, error: "Failed to delete board." };
  }
}
