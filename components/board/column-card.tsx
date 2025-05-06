import { TaskForm } from "../form/task-form";
import { DisplayTask } from "./display-task";
import { EditableColumnTitle } from "./editable-column-title";
import { GoPlus } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const ColumnCard = ({
  column,
  tasks,
  showForm,
  onToggleForm,
  assignedUser,
}: any) => {
  return (
    <div className="text-xl bg-[#F7F8F9] p-4 w-96 shadow rounded flex flex-col gap-4">
      <EditableColumnTitle column={column} />

      <div className="flex flex-col gap-5">
        {tasks
          .filter((task: any) => task.columnId === column.id)
          .map((task: any) => (
            <DisplayTask
              key={task.id}
              task={task}
              assignedUser={assignedUser}
            />
          ))}
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
