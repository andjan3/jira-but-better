"use client";

import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

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
      return;
    }

    try {
      await onSave(value.trim());
    } catch (error) {
      alert("Failed to update title");
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
        className="w-full p-1 border rounded"
      />
    </form>
  ) : (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <div
        className={`font-semibold ${
          variant === "board" ? "text-[26px]" : "text-[18px]"
        }`}
      >
        {title}
      </div>
      {variant !== "board" && <HiOutlinePencilSquare fontSize={20} />}
    </div>
  );
};
