"use server";

import prisma from "@/app/lib/prisma";

export async function getAllBoards() {
  try {
    const boards = await prisma.board.findMany({});
    return boards;
  } catch (error) {
    throw new Error("Failed to get boards");
  }
}
