"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBoard(name: string) {
  try {
    if (!name) throw new Error("Board name is required");

    const createdBoard = await db.board.create({
      data: { name, status: "inProgress" },
    });

    revalidatePath("/");

    return createdBoard;
  } catch (error) {
    throw new Error("Failed to create board");
  }
}
