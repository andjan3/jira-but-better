import { deleteTask } from "@/app/actions/delete-task";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import { Alert } from "../alert-dialog/alert";
import { TaskDialog } from "../task-dialog/task-dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/tiptap-ui-primitive/tooltip";

export const DisplayTask = ({ task }: any) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{
    taskId: number | null;
    boardId: number | null;
    columnId: number | null;
  }>({
    taskId: null,
    boardId: null,
    columnId: null,
  });
  const handleDialog = () => {
    setShowDialog(!showDialog);
  };

  console.log("task from display-task", task);
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
    <div className="shadow-md p-4 rounded-md bg-white hover:bg-slate-200">
      {task.priority !== null ? (
        <div onClick={handleDialog} className="cursor-pointer">
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`${
                    task.priority === "lowPriority"
                      ? "bg-[#7EE2BB]"
                      : task.priority === "highPriority"
                      ? "bg-[#F87168]"
                      : "bg-[#FEA362]"
                  } w-[60px] h-[10px] rounded mb-4`}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Priority category - {task.priority}</p>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center relative">
              <MdClose
                className="delete-icon -mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick({
                    taskId: task.id,
                    boardId: task.boardId,
                    columnId: task.columnId,
                  });
                }}
              />
            </div>
          </div>
          <div>{task.title}</div>
        </div>
      ) : (
        <div
          onClick={handleDialog}
          className="flex justify-between items-center cursor-pointer relative"
        >
          <span>{task.title}</span>
          <MdClose
            className="delete-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick({
                taskId: task.id,
                boardId: task.boardId,
                columnId: task.columnId,
              });
            }}
          />
        </div>
      )}

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {showDialog && (
        <TaskDialog
          task={task}
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};
