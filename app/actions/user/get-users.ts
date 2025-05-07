"use server";

import { db } from "../../lib/prisma";

export const getUsers = async () => {
  return await db.user.findMany({});
};
