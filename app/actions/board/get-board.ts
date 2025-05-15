"use server";

import { db } from "@/app/lib/prisma";

export async function getBoard(id: number) {
  try {
    const board = await db.board.findUnique({
      where: { id },
      include: { columns: true },
    });
    return board;
  } catch (error) {
    throw new Error("Failed to get board");
  }
}
