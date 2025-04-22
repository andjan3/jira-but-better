import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { db } from "../../lib/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const boards = await prisma.board.findMany({});
    const test = NextResponse.json(boards);

    return test;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Board name is required" },
      { status: 400 }
    );
  }

  const board = await prisma.board.create({
    data: {
      name,
      status: "inProgress",
    },
  });

  return NextResponse.json(board);
}
