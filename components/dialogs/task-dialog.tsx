/**
 * TaskDialog component.
 * ---------------------
 *
 * A modal dialog for viewing, editing and assign users to a task.
 *
 * Features:
 * - Displays task priority with a color bar.
 * - Editable task title with inline editing support.
 * - Rich text editor for viewing and editing the task description.
 * - Popovers for setting task priority label and managing task members.
 * - Allows users to assign themselves to the task.
 * - Handles state and server updates for task title and description.
 * - Uses DOMPurify to safely render HTML content from task descriptions.
 *
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import RichTextEditor from "../editor/richtext-editor";
import { AddPriorityForm } from "../form/add-priority-form";
import { TaskMemberAssignment } from "../board/task-member-assignment";
import { Priority } from "@/app/types/board-types";
import { useSession } from "next-auth/react";
import { EditableTitle } from "../board/editable-title";
import { updateTaskName } from "@/app/actions/task/update-task-name";
import { assignUserToTask } from "@/app/actions/client-actions";
import { updateTaskDescription } from "@/app/actions/task/update-task-description";
import { getPriorityClass } from "@/lib/priority-utils";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  description?: string;
  isDone?: boolean;
  priority?: Priority | null;
  boardId?: number | null;
  columnId?: number | null;
}

export function TaskDialog({
  task,
  isOpen,
  onClose,
}: {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [description, setDescription] = useState(task.description || "");
  const [editingDescription, setEditingDescription] = useState<boolean>(false);
  const { data: session } = useSession();

  if (task.boardId == null || task.columnId == null) {
    console.error("Board ID or Column ID is missing!");
    return;
  }
  const safeHTML = DOMPurify.sanitize(task.description || "");

  const handleRichTextChange = (content: string) => {
    setDescription(content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task.boardId == null || task.columnId == null) {
      console.error("Board ID or Column ID is missing!");
      return;
    }
    try {
      const response = await updateTaskDescription(
        task.id,
        task.boardId,
        task.columnId,
        description
      );
      if ("success" in response && response.success) {
        setEditingDescription(false);
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleAssignment = async () => {
    if (task.boardId == null) {
      console.error("No board ID found");
      return;
    }
    if (session?.user.id == null) {
      console.error("No session user ID found");
      return;
    }

    const userId = Number(session.user.id);

    const assignRes = await assignUserToTask(task.id, userId, task.boardId);
    if (assignRes) {
      toast.message("Assignment was successful!", {
        description: "You have been assigned to the task.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:min-w-[825px] max-h-[90vh] overflow-y-auto lg:overflow-y-hidden overflow-x-hidden">
        <div
          className={`${getPriorityClass(task)} w-[60px] h-[10px] rounded mb-4`}
        ></div>
        <DialogHeader>
          <DialogDescription className="!h-0 !pt-0 !pb-0" />
          <EditableTitle
            title={task.title || ""}
            id={task.id}
            boardId={task.boardId}
            onSave={async (newTitle) => {
              await updateTaskName(task.id, task.boardId!, newTitle);
            }}
            variant="task"
          />
        </DialogHeader>

        <div
          className={`flex flex-col md:flex-row gap-10 pt-5  ${
            editingDescription
              ? "overflow-hidden md:w-full"
              : "w-full md:w-full"
          }`}
        >
          <div className="flex-1 min-w-0">
            <DialogTitle className="font-medium mb-2">Description</DialogTitle>

            {!editingDescription ? (
              <button
                className="cursor-pointer hover:bg-slate-200 w-full p-2 text-start"
                onClick={() => setEditingDescription(true)}
                dangerouslySetInnerHTML={{
                  __html: safeHTML || "No description. Click to add one.",
                }}
                aria-label="Change task description"
              />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <div className="flex-1 min-h-[200px] mt-5">
                  <RichTextEditor
                    content={description}
                    onChange={handleRichTextChange}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingDescription(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            )}
          </div>
          <div className="w-full md:w-[30%] flex flex-col gap-4 ">
            <Popover>
              <PopoverTrigger className="font-medium bg-[#F7F8F9] p-3 rounded-lg shadow-sm border-none text-start">
                Label
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Labels</h4>
                  <p className="text-sm text-muted-foreground">
                    Set priority for your task.
                  </p>
                </div>

                <AddPriorityForm
                  taskId={task.id}
                  boardId={task.boardId}
                  columnId={task.columnId}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger className="font-medium bg-[#F7F8F9] p-3 rounded-lg shadow-sm border-none text-start">
                Members
              </PopoverTrigger>
              <PopoverContent className="max-h-[250px] w-[300px] ">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Members</h4>
                  <button
                    className="lg:text-sm text-[16px]  text-muted-foreground cursor-pointer hover:text-black"
                    onClick={() => handleAssignment()}
                    aria-label={`Assign yourself to task: ${task.title}`}
                  >
                    Assign yourself
                  </button>
                </div>
                <TaskMemberAssignment taskId={task.id} boardId={task.boardId} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
