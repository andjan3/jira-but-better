import { deleteTask } from "@/app/actions/task/delete-task";
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
import { useBoard } from "@/app/context/board-context";
import { Priority } from "@/app/types/board-types";
import { MembersPopOver } from "../members-popover/members-popover";
import { ZodNumber } from "zod";

interface Task {
  task: {
    id: number;
    title: string;
    description?: string;
    isDone?: boolean;
    priority?: Priority | null;
    boardId?: number | null;
    columnId?: number | null;
  };
}

export const DisplayTask = ({ task }: Task) => {
  const { assignedUser } = useBoard();
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
      await deleteTask(
        taskToDelete.taskId,
        taskToDelete.boardId,
        taskToDelete.columnId
      );
      toast.message("Task deleted successfully!", {
        description: "The has been removed",
      });
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
    <div className="shadow-md p-4 rounded-md bg-white hover:bg-slate-200 ">
      {task.priority !== null ? (
        <div onClick={handleDialog} className="cursor-pointer">
          <div className="flex items-center justify-between ">
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
                  if (task.columnId != null) {
                    handleDeleteClick({
                      taskId: task.id,
                      boardId: task.boardId!,
                      columnId: task.columnId,
                    });
                  } else {
                    console.error("Task has no valid columnId!");
                  }
                }}
              />
            </div>
          </div>
          <div>{task.title}</div>
          <div className="flex justify-end gap-1">
            {assignedUser
              .filter((user: any) => user.taskId == task.id)
              .map((item: any) => (
                <MembersPopOver
                  item={item}
                  boardId={task.boardId}
                  key={`${item.userId}-${task.id}`}
                />
              ))}
          </div>
        </div>
      ) : (
        <div onClick={handleDialog} className="cursor-pointer ">
          <div className="flex justify-between items-center  relative mb-7 ">
            <span>{task.title}</span>

            <MdClose
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                if (task.columnId != null) {
                  handleDeleteClick({
                    taskId: task.id,
                    boardId: task.boardId!,
                    columnId: task.columnId,
                  });
                } else {
                  console.error("Task has no valid columnId!");
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-1">
            {assignedUser
              .filter((user: any) => user.taskId == task.id)
              .map((item: any) => (
                <MembersPopOver
                  item={item}
                  boardId={task.boardId}
                  key={`${item.userId}-${task.id}`}
                />
              ))}
          </div>
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
