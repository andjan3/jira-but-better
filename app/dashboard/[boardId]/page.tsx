import { getBoard } from "@/app/lib/actions/get-board";
import { TaskColumn } from "@/components/ui/task-column";

type Props = {
  params: {
    boardId: string;
  };
};

export default async function BoardPage({ params }: Props) {
  try {
    const boardId = parseInt(params.boardId);

    if (isNaN(boardId)) {
      throw new Error("Invalid board ID");
    }

    const boardData = await getBoard(boardId);
    return <TaskColumn res={boardData} />;
  } catch (error) {
    return <div>Error loading board </div>;
  }
}
