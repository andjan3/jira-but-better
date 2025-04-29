import { getBoard } from "@/app/actions/board";
import { getTasks } from "@/app/actions/tasks";
import { TaskColumn } from "@/components/board/task-column";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function BoardPage({ params }: Props) {
  try {
    const boardId = Number(params.id);

    if (isNaN(boardId)) {
      return notFound();
    }

    const boardData = await getBoard(boardId);
    const tasks = await getTasks();

    if (!boardData) {
      return notFound();
    }

    return <TaskColumn res={boardData} tasks={tasks} />;
  } catch (error) {
    console.error("Error loading board:", error);
    return <div>Error loading board. Please try again later.</div>;
  }
}
