/**
 * Gets all boards from the database.
 *
 * @returns An array of board objects.
 * @throws Throws an error if the fetch operation fails.
 */

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
