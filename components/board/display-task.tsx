import { deleteTask } from "@/app/actions/delete-task";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";

export const DisplayTask = ({ task }: any) => {
  const [delTask, setDelTask] = useState<{
    taskId: number | null;
    boardId: number | null;
    columnId: number | null;
  }>({
    taskId: null,
    boardId: null,
    columnId: null,
  });

  const handleDeleteTask = async (data: {
    taskId: number;
    boardId: number;
    columnId: number;
  }) => {
    try {
      setDelTask(data);
      const delResponse = await deleteTask(
        data.taskId,
        data.boardId,
        data.columnId
      );
      if ("success" in delResponse && delResponse.success) {
        toast("Task deleted successfully!", {
          style: {
            height: "10vh",
            width: "30vw",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            fontSize: "18px",
          },
        });
      }
    } catch (err) {
      throw new Error(
        "Failed to delete task: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  return (
    <div className="flex justify-between items-center shadow-md p-4 rounded-md bg-white">
      <div className="text-base">{task.title}</div>
      <MdClose
        className="cursor-pointer"
        onClick={() =>
          handleDeleteTask({
            taskId: task.id,
            boardId: task.boardId,
            columnId: task.columnId,
          })
        }
      />
    </div>
  );
};
