import { NextResponse } from "next/server";
import { db } from "../../lib/prisma";

export async function GET() {
  try {
    const columns = await db.board.findMany({});
    const res = NextResponse.json(columns);

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch columns" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Column name is required" },
      { status: 400 }
    );
  }

  const board = await db.board.create({
    data: {
      name,
      status: "inProgress",
    },
  });

  return NextResponse.json(board);
}
