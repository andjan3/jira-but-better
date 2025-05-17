/**
 * Gets all users from the database.
 *
 * @returns An array of user objects.
 * @throws Returns empty array if the operation fails.
 */

"use server";

import prisma from "@/app/lib/prisma";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({});
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
