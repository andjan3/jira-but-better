"use client";

import { useState } from "react";

interface EditableTitleProps {
  title: string;
  id: number;
  boardId?: number;
  columnId?: number;
  onSave: (newTitle: string) => Promise<void>;
  boardTitle: boolean;
}

export const EditableTitle = ({
  title,
  boardTitle,
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
    <div className="flex items-center">
      <div
        onClick={() => setIsEditing(true)}
        className={`cursor-pointer font-semibold ${
          boardTitle && "text-[26px]"
        }`}
      >
        {title}
      </div>
    </div>
  );
};
