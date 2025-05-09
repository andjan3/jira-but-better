"use server";

import { db } from "../../lib/prisma";

export const getTasks = async () => {
  return await db.task.findMany({});
};
