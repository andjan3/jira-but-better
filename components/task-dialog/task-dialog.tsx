import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { updateTask } from "@/app/actions/update-task";

export function TaskDialog({
  task,
  isOpen,
  onClose,
}: {
  task: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [description, setDescription] = useState(task.description || "");
  const [editingDescription, setEditingDescription] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <DialogContent className="sm:min-w-[825px]">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <div className="pt-5">Description</div>
        </DialogHeader>

        {!editingDescription ? (
          <DialogDescription
            className="cursor-pointer"
            onClick={() => setEditingDescription(true)}
          >
            {task.description || "No description. Click to add one."}
          </DialogDescription>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <Textarea
                id="description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => setEditingDescription(false)}
                className="bg-transparent  text-black hover:bg-[#f1f5f9]"
              >
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
