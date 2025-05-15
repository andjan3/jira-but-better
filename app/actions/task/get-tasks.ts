"use server";

import prisma from "@/app/lib/prisma";

export const getTasks = async () => {
  try {
    const task = await prisma.task.findMany({});
    return task;
  } catch (error) {
    console.error("Error while fetching tasks:", error);
    throw new Error("Could not find any tasks. Please try again later.");
  }
};
