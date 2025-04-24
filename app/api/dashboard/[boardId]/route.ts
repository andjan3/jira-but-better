import { NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  const boardId = Number(params.boardId);

  try {
    const board = await db.board.findUnique({
      where: { id: boardId },
      include: { columns: true },
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(board);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching board" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  const boardId = parseInt(params.boardId);

  if (isNaN(boardId)) {
    return NextResponse.json({ error: "Invalid board ID" }, { status: 400 });
  }

  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Column name is required" },
      { status: 400 }
    );
  }

  try {
    const boardExists = await db.board.findUnique({
      where: { id: boardId },
    });

    if (!boardExists) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const existingColumns = await db.column.findMany({
      where: { boardId },
    });

    const nextOrder = existingColumns.length;

    const column = await db.column.create({
      data: {
        title: name,
        boardId,
        order: nextOrder,
      },
    });

    return NextResponse.json(column);
  } catch (error) {
    console.error("POST column error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
