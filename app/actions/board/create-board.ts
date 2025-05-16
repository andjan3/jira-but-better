/**
 * Creates a new board with the specified name.
 * The board's initial status is set to "inProgress".
 *
 * @param name - The name of the board (required).
 * @returns The created board object.
 * @throws Error if the name is missing or creation fails.
 */

"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBoard(name: string) {
  try {
    if (!name) throw new Error("Board name is required");

    const createdBoard = await prisma.board.create({
      data: { name, status: "inProgress" },
    });

    revalidatePath("/");

    return createdBoard;
  } catch (error) {
    throw new Error("Failed to create board");
  }
}
