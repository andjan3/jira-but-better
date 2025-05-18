/**
 * Column component.
 * ---------------------
 *
 * Renders a single column within a board, including its title, tasks, and UI controls.
 *
 * Features:
 * - Editable column title with inline editing and update functionality.
 * - List of draggable tasks using the `Draggable` component for drag-and-drop reordering.
 * - Button to toggle a form for adding new tasks to the column.
 * - RemovePopOver to delete the column.
 */

import { Tasks } from "@/app/types/board-types";
import { AddTaskForm } from "../form/add-task-form";
import { TaskCard } from "./task-card";
import { EditableTitle } from "./editable-title";
import { GoPlus } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { updateColumnName } from "@/app/actions/column/update-column-name";
import { RemovePopOver } from "../popover/remove-popover";
import { Draggable } from "@hello-pangea/dnd";

interface ColumnProps {
  column: {
    id: number;
    title?: string;
    order?: number;
    boardId?: number;
  };
  tasks: Tasks[];
  showForm: number | null;
  onToggleForm: (id: number | null) => void;
}

export const Column = ({
  column,
  tasks,
  showForm,
  onToggleForm,
}: ColumnProps) => {
  if (!column.boardId) {
    console.error("Board ID is missing for column:", column);
    return <div>Invalid column data</div>;
  }

  const renderTasks = () => (
    <div className="flex flex-col gap-5">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );

  return (
    <div className="text-xl p-4 w-[320px] lg:w-96 flex flex-col gap-4 mb-5 rounded-xl border border-slate-200 text-slate-950 shadow bg-slate-50">
      <div className="flex items-center justify-between">
        <EditableTitle
          title={column.title || ""}
          id={column.id}
          boardId={column.boardId}
          onSave={async (newTitle) => {
            await updateColumnName(column.id, column.boardId!, newTitle);
          }}
          variant="column"
        />
        <RemovePopOver columnId={column.id} boardId={column.boardId} isColumn />
      </div>

      {renderTasks()}

      {showForm === column.id ? (
        <div className="flex items-end">
          <AddTaskForm columnId={column.id} boardId={column.boardId} />
          <button
            className="cursor-pointer -ml-44 lg:-ml-60"
            onClick={() => onToggleForm(null)}
            aria-label="Close form for adding task to a column"
          >
            <IoIosCloseCircleOutline fontSize={30} aria-label="Close icon" />
          </button>
        </div>
      ) : (
        <button
          className="cursor-pointer text-base flex items-center gap-2 hover:bg-slate-200 p-4 rounded-md"
          onClick={() => onToggleForm(column.id)}
        >
          <GoPlus fontSize={25} aria-label="Plus icon" />
          Create task
        </button>
      )}
    </div>
  );
};
