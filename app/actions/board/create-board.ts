"use server";
import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBoard(name: string) {
  if (!name) throw new Error("Board name is required");

  const createdBoard = await db.board.create({
    data: { name, status: "inProgress" },
  });

  revalidatePath("/");

  return createdBoard;
}
