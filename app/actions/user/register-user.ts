"use server";

import { prisma } from "@/app/lib/prisma";
import { hash } from "bcrypt";

export const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const convertedEmail = email.trim().toLowerCase();
    const convertedUsername = username.trim();

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long.",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: convertedEmail },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: convertedUsername },
    });

    if (existingUsername) {
      return {
        success: false,
        error: "An account with this username already exists.",
      };
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: convertedEmail,
        password: hashedPassword,
        username: convertedUsername,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Something went wrong during registration. Please try again.",
    };
  }
};
