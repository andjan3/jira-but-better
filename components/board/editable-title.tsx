/**
 * EditableTitle component.
 * ------------------------
 *
 * Provides an inline editable text field for updating titles on boards, columns, and tasks.
 *
 * Features:
 * - Displays the title as text by default.
 * - On click, switches to an input field for editing the title.
 * - Validates the new title before saving (must be non-empty and different).
 * - Calls the provided `onSave` function to persist changes asynchronously.
 *
 */

"use client";

import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { toast } from "sonner";

interface EditableTitleProps {
  title: string;
  id: number;
  boardId?: number;
  columnId?: number;
  onSave: (newTitle: string) => Promise<void>;
  variant: "board" | "column" | "task";
}

export const EditableTitle = ({
  title,
  variant,
  onSave,
}: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const handleSave = async () => {
    if (value.trim() === title.trim() || value.trim() === "") {
      setIsEditing(false);
      toast.message("Failed to update title", {
        description: "Make sure that it’s not the same title.",
      });
      return;
    }

    try {
      await onSave(value.trim());
      toast.message("Succesfully updated new title");
    } catch (error) {
      toast.message("Failed to update title");
    } finally {
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSave();
  };

  return isEditing ? (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        required
        className="w-full p-1 border rounded"
      />
    </form>
  ) : (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <button
        className={`font-semibold ${
          variant === "board" ? "text-[26px]" : "min-w-[40px] text-[18px]"
        }`}
        aria-label={`Change ${variant} name`}
      >
        {title}
      </button>
      {variant !== "board" && (
        <HiOutlinePencilSquare fontSize={20} aria-label="Pencil icon" />
      )}
    </div>
  );
};
