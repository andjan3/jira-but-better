"use server";
import { db } from "@/app/lib/prisma";

export async function getAllBoards() {
  return await db.board.findMany({});
}
