"use server";

import { db } from "@/app/lib/prisma";

export const getUsers = async () => {
  try {
    const users = await db.user.findMany({});
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
