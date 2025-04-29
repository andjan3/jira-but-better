"use client";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { ColumnForm } from "../form/columns-form";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TaskForm } from "../form/task-form";
import { DisplayTask } from "./display-task";

export const TaskColumn = ({ res, tasks }: any) => {
  const [addColumn, setAddColumn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleColumns = () => {
    setAddColumn(!addColumn);
  };

  const handleForm = (id: any) => {
    setShowForm(id ? id : null);
  };

  const test = res?.columns.map((item: any) => console.log(item.id));
  console.log(res);

  return (
    <div className="flex justify-center items-start gap-10 relative top-40 z-20">
      {res?.columns?.map((col: any) => (
        <div
          key={col.id}
          className="text-xl bg-[#F7F8F9] p-4 w-96 shadow rounded flex flex-col gap-4"
        >
          <div>{col.title}</div>

          <div className="flex flex-col gap-5">
            {tasks
              .filter((task: any) => task.columnId === col.id)
              .map((task: any) => (
                <DisplayTask key={task.id} task={task} />
              ))}
          </div>

          {showForm == col.id ? (
            <div>
              <div className="flex items-end">
                <TaskForm columnId={col.id} boardId={col.boardId} />
                <IoIosCloseCircleOutline
                  fontSize={30}
                  className="cursor-pointer -ml-60"
                  onClick={handleForm}
                />
              </div>
            </div>
          ) : (
            <button
              className="cursor-pointer text-base flex items-center gap-2 hover:bg-slate-200 p-4 rounded-md"
              onClick={() => handleForm(col.id)}
            >
              <GoPlus fontSize={25} /> Create task
            </button>
          )}
        </div>
      ))}

      {addColumn ? (
        <div
          className="relative flex items-center gap-4  bg-[#F7F8F9] z-20 p-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ColumnForm id={res.id} />
          <IoIosCloseCircleOutline
            fontSize={30}
            className="cursor-pointer"
            onClick={handleColumns}
          />
        </div>
      ) : (
        <div
          className="relative flex items-center h-[20%] gap-4 bg-[#F7F8F9] p-4 pl-20 pr-20 cursor-pointer z-20 hover:bg-slate-200"
          onClick={handleColumns}
        >
          <GoPlus fontSize={25} />
          <div className="text-[20px]">Add a list</div>
        </div>
      )}
    </div>
  );
};
