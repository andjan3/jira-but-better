import { Tasks } from "@/app/types/board-types";
import { TaskForm } from "../form/task-form";
import { DisplayTask } from "./display-task";
import { EditableTitle } from "./editable-column-title";
import { GoPlus } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Priority } from "@prisma/client";
import { updateColumnName } from "@/app/actions/column/update-column-name";
import { RemovePopOver } from "../remove-popover/remove-popover";
import { Draggable } from "@hello-pangea/dnd";

interface Task {
  id: number;
  title: string;
  description?: string;
  isDone?: boolean;
  priority?: Priority | null;
  boardId: number;
  columnId: number;
  order: number;
}

interface ColumnCardProps {
  column: {
    id: number;
    title?: string;
    order?: number;
    boardId?: number;
  };
  tasks: Tasks[];
  showForm: any;
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
  const sortedTasks = tasks
    .filter((task: Task) => task.columnId === column.id)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="text-xl  p-4 w-[320px] lg:w-96  flex flex-col gap-4 mb-5 rounded-xl border border-slate-200  text-slate-950 shadow bg-slate-50 ">
      <div className="flex items-center justify-between">
        <EditableTitle
          title={column.title || ""}
          id={column.id}
          boardId={column.boardId}
          onSave={async (newTitle) => {
            await updateColumnName(column.id, column.boardId!, newTitle);
          }}
          boardTitle={false}
        />
        <RemovePopOver
          columnId={column.id}
          boardId={column.boardId}
          isColumn={true}
        />
      </div>
      <div className="flex flex-col gap-5">
        {sortedTasks
          .filter((task: Task) => task.columnId === column.id)
          .map((task: Task, index) => {
            return (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DisplayTask task={task} />
                  </div>
                )}
              </Draggable>
            );
          })}
      </div>

      {showForm === column.id ? (
        <div className="flex items-end">
          <TaskForm columnId={column.id} boardId={column.boardId} />
          <IoIosCloseCircleOutline
            fontSize={30}
            className="cursor-pointer -ml-44 lg:-ml-60"
            onClick={() => onToggleForm(null)}
            aria-label="Close form for adding task to a column"
          />
        </div>
      ) : (
        <button
          className="cursor-pointer text-base flex items-center gap-2 hover:bg-slate-200 p-4 rounded-md"
          onClick={() => {
            onToggleForm(column.id);
          }}
        >
          <GoPlus fontSize={25} aria-label="Create a task" /> Create task
        </button>
      )}
    </div>
  );
};
