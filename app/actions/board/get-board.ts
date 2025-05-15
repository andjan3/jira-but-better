"use server";

import prisma from "@/app/lib/prisma";

export async function getBoard(id: number) {
  try {
    const board = await prisma.board.findUnique({
      where: { id },
      include: { columns: true },
    });
    return board;
  } catch (error) {
    throw new Error("Failed to get board");
  }
}
