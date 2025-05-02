import { getBoard } from "@/app/actions/board";
import { getTasks } from "@/app/actions/tasks";
import { Column } from "@/components/board/column";
import { Nav } from "@/components/header/nav";
import { SideBar } from "@/components/sidebar/sidebar";
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

    return (
      <div>
        <Nav />
        <div className="grid grid-cols-[300px_1fr]">
          <SideBar />
          <Column res={boardData} tasks={tasks} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading board:", error);
    return <div>Error loading board. Please try again later.</div>;
  }
}
