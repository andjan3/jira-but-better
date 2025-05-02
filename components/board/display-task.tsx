import { deleteTask } from "@/app/actions/delete-task";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import { Alert } from "../alert-dialog/alert";

export const DisplayTask = ({ task }: any) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{
    taskId: number | null;
    boardId: number | null;
    columnId: number | null;
  }>({
    taskId: null,
    boardId: null,
    columnId: null,
  });

  const handleDeleteClick = (data: {
    taskId: number;
    boardId: number;
    columnId: number;
  }) => {
    setTaskToDelete(data);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (
      !taskToDelete.taskId ||
      !taskToDelete.boardId ||
      !taskToDelete.columnId
    ) {
      return;
    }

    try {
      const delResponse = await deleteTask(
        taskToDelete.taskId,
        taskToDelete.boardId,
        taskToDelete.columnId
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
    } finally {
      setIsAlertOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center shadow-md p-4 rounded-md bg-white">
        <div className="text-base">{task.title}</div>
        <MdClose
          className="cursor-pointer"
          onClick={() =>
            handleDeleteClick({
              taskId: task.id,
              boardId: task.boardId,
              columnId: task.columnId,
            })
          }
        />
      </div>

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
