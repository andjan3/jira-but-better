/**
 * Deletes a user account by its ID, including all associated user-task relations.
 *
 * @param userId - The ID of the task to delete.
 * @returns An object indicating whether the deletion was successful.
 */

"use server";
import prisma from "@/app/lib/prisma";

export const deleteAccount = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    await prisma.userTask.deleteMany({
      where: {
        userId: userId,
      },
    });

    await prisma.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: "Failed to delete user. Please try again later.",
    };
  }
};
