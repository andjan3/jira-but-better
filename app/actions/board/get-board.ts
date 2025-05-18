/**
 * Gets a specific board from the database by its ID.
 *
 * @param id - The ID of the board.
 * @returns The board object, including its columns.
 * @throws Throws an error if the fetch operation fails.
 */

"use server";

import prisma from "@/app/lib/prisma";

export async function getBoard(id: number) {
  try {
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            tasks: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    return board;
  } catch (error) {
    throw new Error("Failed to get board");
  }
}
