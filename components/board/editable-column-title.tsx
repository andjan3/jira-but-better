"use client";
import { useState } from "react";
import { updateColumnName } from "@/app/actions/column/update-column-name";

interface ColumnProps {
  column: {
    id: number;
    title?: string;
    order?: number;
    boardId?: number;
  };
}

export const EditableColumnTitle = ({ column }: ColumnProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [columnName, setColumnName] = useState(column.title || "");
  const handleUpdateColumn = async () => {
    if (columnName.trim() === column.title?.trim()) {
      setIsEditing(false);
      return;
    }

    if (column.boardId == null || columnName.trim() === "") {
      return;
    }

    try {
      await updateColumnName(column.id, column.boardId, columnName.trim());
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
