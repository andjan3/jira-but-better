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
import { updateTask } from "@/app/actions/update-task";
import RichTextEditor from "../rich-text-editor";

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

  const safeHTML = DOMPurify.sanitize(task.description);
  const handleRichTextChange = (content: string) => {
    setDescription(content);
  };

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
            dangerouslySetInnerHTML={{
              __html: safeHTML || "No description. Click to add one.",
            }}
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <RichTextEditor
                content={description}
                onChange={handleRichTextChange}
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
