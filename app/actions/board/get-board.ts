"use server";

import { db } from "@/app/lib/prisma";

export async function getBoard(id: number) {
  return await db.board.findUnique({
    where: { id },
    include: { columns: true },
  });
}
