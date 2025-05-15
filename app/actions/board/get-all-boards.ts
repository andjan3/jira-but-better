"use server";

import { db } from "@/app/lib/prisma";

export async function getAllBoards() {
  try {
    const boards = await db.board.findMany({});
    return boards;
  } catch (error) {
    throw new Error("Failed to get boards");
  }
}
