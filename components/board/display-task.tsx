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
import { MembersPopOver } from "../members-popover/members-popover";
import { getPriorityClass } from "@/lib/priority-utils";
import { User } from "@/app/types/board-types";
import { ConvertPriorityLabels } from "@/lib/convert-priority-labels";

interface Task {
  task: {
    id: number;
    title: string;
    description?: string;
    isDone?: boolean;
    priority?: "lowPriority" | "highPriority" | "mediumPriority" | null;
    boardId: number | null;
    columnId: number | null;
  };
}

interface UserProps {
  assignedAt: Date;
  taskId: number;
  user: User;
  userId: number;
}

export const DisplayTask = ({ task }: Task) => {
  const { assignedUser } = useBoard();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{
    taskId: number | null;
    boardId: number | null;
    columnId: number | null;
  }>({ taskId: null, boardId: null, columnId: null });

  const handleDialog = () => setShowDialog((prev) => !prev);

  const handleDeleteClick = ({
    taskId,
    boardId,
    columnId,
  }: {
    taskId: number;
    boardId: number;
    columnId: number;
  }) => {
    setTaskToDelete({ taskId, boardId, columnId });
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    const { taskId, boardId, columnId } = taskToDelete;
    if (!taskId || !boardId || !columnId) return;

    try {
      await deleteTask(taskId, boardId, columnId);
      toast.message("Task deleted successfully!", {
        description: "The task has been removed.",
      });
    } catch (err) {
      toast.error(
        "Failed to delete task: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setIsAlertOpen(false);
    }
  };

  const assignedMembers = assignedUser.filter(
    (user: UserProps) => user.taskId === task.id
  );

  return (
    <div className="shadow-md p-4 rounded-md bg-white hover:bg-slate-200">
      <div onClick={handleDialog} className="cursor-pointer">
        <div
          className={`flex items-center justify-between ${
            task.priority == null && "mt-2"
          }`}
        >
          {task.priority ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`${getPriorityClass(
                    task
                  )} w-[60px] h-[10px] rounded mb-4`}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Priority: {ConvertPriorityLabels[task.priority]}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div></div>
          )}
          <MdClose
            className="delete-icon -mt-2"
            onClick={(e) => {
              e.stopPropagation();
              if (task.columnId != null) {
                handleDeleteClick({
                  taskId: task.id,
                  boardId: task.boardId!,
                  columnId: task.columnId!,
                });
              } else {
                toast.error("Task has no valid columnId!");
              }
            }}
            aria-label="Delete task"
          />
        </div>
        <div>{task.title}</div>
        <div className="flex justify-end gap-1">
          {assignedMembers.map((item: any) => (
            <MembersPopOver
              item={item}
              boardId={task.boardId}
              key={`${item.userId}-${task.id}`}
            />
          ))}
        </div>
      </div>

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmDelete}
        item={"task"}
      />
      {showDialog && (
        <TaskDialog task={task} isOpen={showDialog} onClose={handleDialog} />
      )}
    </div>
  );
};
