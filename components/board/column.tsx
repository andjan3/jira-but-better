"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ColumnForm } from "../form/columns-form";
import { ColumnCard } from "./column-card";

export const Column = ({ res, tasks }: any) => {
  const [addColumn, setAddColumn] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleAddColumn = () => setAddColumn((prev) => !prev);
  const toggleForm = (id: any) => setShowTaskForm(id ? id : null);

  return (
    <div className="pt-8 pl-8">
      <div className="flex gap-5 items-center mb-8">
        <h1 className="text-[30px] capitalize font-normal">{res.name}</h1>
        <HiOutlineDotsHorizontal
          fontSize={30}
          className="mt-[5px] cursor-pointer hover:bg-slate-200"
          aria-label="Open board settings"
        />
      </div>

      <div className="flex items-start gap-10">
        {res?.columns
          .sort((a: any, b: any) => a.order - b.order)
          .map((col: any) => (
            <ColumnCard
              key={col.id}
              column={col}
              tasks={tasks}
              showForm={showTaskForm}
              onToggleForm={toggleForm}
            />
          ))}

        {addColumn ? (
          <div
            className="relative flex items-center gap-4 bg-[#F7F8F9] z-20 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ColumnForm id={res.id} />
            <IoIosCloseCircleOutline
              fontSize={30}
              className="cursor-pointer"
              onClick={toggleAddColumn}
              aria-label="Close form for adding column to board"
            />
          </div>
        ) : (
          <div
            className="flex items-center h-[70px] gap-4 bg-[#F7F8F9] p-4 pl-20 pr-20 cursor-pointer hover:bg-slate-200 min-w-[300px]"
            onClick={toggleAddColumn}
          >
            <GoPlus fontSize={25} aria-label="Add a column to board" />
            <div className="text-[20px]">Create column</div>
          </div>
        )}
      </div>
    </div>
  );
};
