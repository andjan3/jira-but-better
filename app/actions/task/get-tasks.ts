/**
 * Gets all tasks from the database.
 *
 * @returns An array of task objects.
 * @throws Throws an error if the fetch operation fails.
 */

"use server";

import prisma from "@/app/lib/prisma";

export const getTasks = async () => {
  try {
    const tasks = await prisma.task.findMany({});
    return tasks;
  } catch (error) {
    console.error("Error while fetching tasks:", error);
    throw new Error("Could not find any tasks. Please try again later.");
  }
};
