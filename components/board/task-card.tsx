/**
 * TaskCard component.
 * -------------------
 *
 * Displays an individual task with its title, priority indicator, assigned users and functionality for editing and deleting the task.
 *
 * Features:
 * - Shows task title and priority with a colored bar and tooltip.
 * - Displays assigned users along with more specified information by popovers.
 * - Opens a detailed TaskDialog on click for viewing, editing and assigning members to the task.
 * - Provides a delete button with confirmation dialog to remove the task.
 *
 */

import { deleteTask } from "@/app/actions/task/delete-task";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import { TaskDialog } from "../dialogs/task-dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/tiptap-ui-primitive/tooltip";
import { useBoard } from "@/app/context/board-context";
import { AssignedUserPopover } from "../popover/assigned-user-popover";
import { getPriorityClass } from "@/lib/priority-utils";
import { AssignedUser } from "@/app/types/board-types";
import { ConvertPriorityLabels } from "@/lib/convert-priority-labels";
import { DeleteConfirmationDialog } from "../dialogs/delete-confirmation-dialog";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description?: string;
    isDone?: boolean;
    priority?: "lowPriority" | "highPriority" | "mediumPriority" | null;
    boardId: number | null;
    columnId: number | null;
    order: number;
  };
}

export const TaskCard = ({ task }: TaskCardProps) => {
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
    (user: AssignedUser) => user.taskId === task.id
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDialog();
    }
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (task.columnId != null) {
        handleDeleteClick({
          taskId: task.id,
          boardId: task.boardId!,
          columnId: task.columnId!,
        });
      }
    }
  };

  return (
    <div className="p-4 bg-white hover:bg-slate-200 rounded-xl border border-slate-200 text-slate-950 shadow cursor-pointer">
      <div className="cursor-pointer " onClick={handleDialog}>
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
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Priority: {ConvertPriorityLabels[task.priority]}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="mb-4 w-[60px] h-[10px]" />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (task.columnId != null) {
                handleDeleteClick({
                  taskId: task.id,
                  boardId: task.boardId!,
                  columnId: task.columnId!,
                });
              }
            }}
            onKeyDown={handleDeleteKeyDown}
            aria-label={`Delete task ${task.title}`}
          >
            <MdClose
              className="delete-icon -mt-2 "
              fontSize={25}
              aria-label="Delete icon"
            />
          </button>
        </div>
        <div
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`Open task dialog for ${task.title}`}
        >
          {task.title}
        </div>

        <div className="flex justify-end gap-1 mt-2">
          {assignedMembers.map((assignedUser) => (
            <AssignedUserPopover
              item={assignedUser}
              boardId={task.boardId}
              key={`${assignedUser.userId}-${task.id}`}
            />
          ))}
        </div>
      </div>
      <DeleteConfirmationDialog
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
