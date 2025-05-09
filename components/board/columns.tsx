"use client";

import { useState } from "react";
import { useBoard } from "@/app/context/board-context";
import { DragDropContext } from "@hello-pangea/dnd";
import { BoardHeader } from "../board-header";
import { AddColumn } from "../add-column";
import { ColumnList } from "../column-list";
import { useDragAndDrop } from "@/hooks/use-drag-and-drop";

export const Columns = () => {
  const { boardData } = useBoard();
  const [addColumn, setAddColumn] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState<number | null>(null);

  const toggleAddColumn = () => setAddColumn((prev) => !prev);

  const toggleForm = (id: number | null) => {
    setShowTaskForm((prev) => (prev === id ? null : id));
  };

  const { localTasks, handleDragEnd } = useDragAndDrop();

  return (
    <div className="pt-8 pl-8">
      <BoardHeader />

      <div className="flex items-start gap-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <ColumnList
            columns={boardData?.columns || []}
            localTasks={localTasks}
            showTaskForm={showTaskForm}
            toggleForm={toggleForm}
          />
        </DragDropContext>

        <AddColumn addColumn={addColumn} toggleAddColumn={toggleAddColumn} />
      </div>
    </div>
  );
};
