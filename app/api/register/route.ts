import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Lösenordet måste vara minst 6 tecken långt" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "En användare med denna e-post finns redan" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        username: username,
      },
    });

    return NextResponse.json({ user, success: true });
  } catch (error) {
    console.error("Registreringsfel:", error);
    return NextResponse.json(
      { error: "Ett serverfel inträffade" },
      { status: 500 }
    );
  }
}
