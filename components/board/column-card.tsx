import { Tasks } from "@/app/types/board-types";
import { TaskForm } from "../form/task-form";
import { DisplayTask } from "./display-task";
import { EditableTitle } from "./editable-column-title";
import { GoPlus } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Priority } from "@prisma/client";
import { updateColumnName } from "@/app/actions/column/update-column-name";
import { RemovePopOver } from "../remove-popover/remove-popover";

interface Task {
  id: number;
  title: string;
  description?: string;
  isDone?: boolean;
  priority?: Priority | null;
  boardId: number;
  columnId: number;
}

interface ColumnCardProps {
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

export const ColumnCard = ({
  column,
  tasks,
  showForm,
  onToggleForm,
}: ColumnCardProps) => {
  if (!column.boardId) {
    console.error("Board ID is missing for column:", column);
    return <div>Invalid column data</div>;
  }

  return (
    <div className="text-xl bg-[#F7F8F9] p-4 w-96 shadow rounded flex flex-col gap-4">
      <div className="flex items-center">
        <EditableTitle
          title={column.title || ""}
          id={column.id}
          boardId={column.boardId}
          onSave={async (newTitle) => {
            await updateColumnName(column.id, column.boardId!, newTitle);
          }}
        />
        <RemovePopOver
          columnId={column.id}
          boardId={column.boardId}
          isColumn={true}
        />
      </div>
      <div className="flex flex-col gap-5">
        {tasks
          .filter((task: Task) => task.columnId === column.id)
          .map((task: Task) => {
            return (
              <div key={task.id}>
                <DisplayTask task={task} />
              </div>
            );
          })}
      </div>

      {showForm === column.id ? (
        <div className="flex items-end">
          <TaskForm columnId={column.id} boardId={column.boardId} />
          <IoIosCloseCircleOutline
            fontSize={30}
            className="cursor-pointer -ml-60"
            onClick={() => onToggleForm(null)}
            aria-label="Close form for adding task to a column"
          />
        </div>
      ) : (
        <button
          className="cursor-pointer text-base flex items-center gap-2 hover:bg-slate-200 p-4 rounded-md"
          onClick={() => onToggleForm(column.id)}
        >
          <GoPlus fontSize={25} aria-label="Create a task" /> Create task
        </button>
      )}
    </div>
  );
};
