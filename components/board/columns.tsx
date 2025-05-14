"use client";

import { useState } from "react";
import { useBoard } from "@/app/context/board-context";
import { DragDropContext } from "@hello-pangea/dnd";

import { useDragAndDrop } from "@/hooks/use-drag-and-drop";
import { ColumnList } from "./column-list";
import { AddColumnButton } from "./add-column-button";
import { BoardHeader } from "./board-header";

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
    <div className="pt-8 px-4 lg:pl-8 lg:pr-0 py-10 lg:py-0 lg:mt-28 mx-auto md:mx-0">
      <BoardHeader />

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 min-w-full md:min-w-[600px] lg:min-w-0">
            <ColumnList
              columns={boardData?.columns || []}
              localTasks={localTasks}
              showTaskForm={showTaskForm}
              toggleForm={toggleForm}
            />
          </div>
        </DragDropContext>

        <div className="min-w-[250px] lg:min-w-[450px] shrink-0">
          <AddColumnButton
            addColumn={addColumn}
            toggleAddColumn={toggleAddColumn}
          />
        </div>
      </div>
    </div>
  );
};
