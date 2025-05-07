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

import { updateTask } from "@/app/actions/update-task";
import RichTextEditor from "../rich-text-editor";
import { PriorityForm } from "../form/priority-form";
import { Members } from "../members/members";
import { Priority } from "@/app/types/board-types";

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
      const response = await updateTask(
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:min-w-[825px] max-h-[800px] ">
        <div
          className={`${
            task.priority === "lowPriority"
              ? "bg-[#7EE2BB]"
              : task.priority === "mediumPriority"
              ? "bg-[#FEA362]"
              : task.priority === "highPriority"
              ? "bg-[#F87168]"
              : "hidden"
          } w-[60px] h-[10px] rounded mb-4`}
        ></div>

        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-10 pt-5">
          <div className="flex-1 min-w-0">
            <div className="font-medium mb-2">Description</div>
            {!editingDescription ? (
              <DialogDescription
                className="cursor-pointer "
                onClick={() => setEditingDescription(true)}
                dangerouslySetInnerHTML={{
                  __html: safeHTML || "No description. Click to add one.",
                }}
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
          <div className="w-full lg:w-[30%] flex flex-col gap-4 ">
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

                <PriorityForm
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
                  <p className="text-sm text-muted-foreground">
                    Assign a member to task.
                  </p>
                </div>
                <Members taskId={task.id} boardId={task.boardId} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
