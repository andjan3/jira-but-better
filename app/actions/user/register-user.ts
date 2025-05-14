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
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    return { error: "An account with this email already exists." };
  }
  const existingUsername = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUsername) {
    return { error: "An account with this username already exists." };
  }
  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      username,
    },
  });

  return { success: true, user };
};
