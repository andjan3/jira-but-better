/**
 * ColumnList component.
 * ---------------------
 * Renders a list of columns for a board along with their associated tasks.
 *
 * Each column is wrapped with a Droppable area (from react-beautiful-dnd) to
 * enable drag-and-drop functionality for tasks within columns.
 *
 * Tasks are filtered by their columnId and sorted by their order property before rendering.
 */

"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Column } from "./column";
import { Priority } from "@/app/types/board-types";

interface Column {
  id: number;
  title?: string;
  order?: number;
  boardId?: number;
}

interface LocalTask {
  boardId: number;
  columnId: number;
  description?: string;
  id: number;
  isDone?: boolean;
  order: number;
  priority?: Priority | null;
  title: string;
}

interface ColumnListProps {
  columns: Column[];
  localTasks: LocalTask[];
  showTaskForm: number | null;
  toggleForm: (id: number | null) => void;
}

export const ColumnList = ({
  columns,
  localTasks,
  showTaskForm,
  toggleForm,
}: ColumnListProps) => {
  return (
    <div className="md:flex items-start gap-10">
      {columns.map((col: Column) => {
        const sortedTasks = localTasks
          .filter((task) => task.columnId === col.id)
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        return (
          <Droppable key={col.id} droppableId={col.id.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="lg:w-96"
              >
                <Column
                  column={col}
                  tasks={sortedTasks}
                  showForm={showTaskForm}
                  onToggleForm={() => toggleForm(col.id)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
};
