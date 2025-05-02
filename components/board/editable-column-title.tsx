"use client";
import { useState } from "react";
import { updateColumnName } from "@/app/actions/update-column-name";

export const EditableColumnTitle = ({ column }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [columnName, setColumnName] = useState(column.title);

  const handleUpdateColumn = async () => {
    if (column.title === columnName.trim()) {
      setIsEditing(false);
      return;
    }

    try {
      await updateColumnName({
        columnId: column.id,
        boardId: column.boardId,
        columnName: columnName.trim(),
      });
    } catch (error) {
      alert("Error updating column name");
    } finally {
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdateColumn();
  };

  return isEditing ? (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={columnName}
        autoFocus
        onChange={(e) => setColumnName(e.target.value)}
        onBlur={handleUpdateColumn}
        className="w-full p-1 border rounded"
      />
    </form>
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer font-semibold"
    >
      {column.title}
    </div>
  );
};
