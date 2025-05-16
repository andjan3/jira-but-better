"use server";

import prisma from "@/app/lib/prisma";
import { hash } from "bcrypt";

interface ChangePasswordProps {
  newPassword: string;
  userId: number;
}

export const changePassword = async ({
  newPassword,
  userId,
}: ChangePasswordProps) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await hash(newPassword, 12);

    const updatedPassword = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    if (!updatedPassword) {
      throw new Error("Password update failed");
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to change password:", error);
    return {
      success: false,
      error: "Something went wrong while changing password. Please try again.",
    };
  }
};
