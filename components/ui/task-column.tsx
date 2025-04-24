"use client";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { ColumnForm } from "../form/columns-form";

export const TaskColumn = ({ res }: any) => {
  const [addColumn, setAddColumn] = useState(false);

  const handleColumns = () => {
    setAddColumn(!addColumn);
  };

  return (
    <div className="flex justify-center gap-10 relative top-40">
      {res?.columns?.map((col: any) => (
        <div
          key={col.id}
          className="text-xl bg-[#F7F8F9] p-4 w-60 shadow rounded"
        >
          {col.title}
        </div>
      ))}

      {addColumn ? (
        <div
          className="relative flex items-center h-[20%] gap-4 bg-[#F7F8F9] p-4 pl-20 pr-20 cursor-pointer z-20"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ColumnForm boardId={res.id} />
        </div>
      ) : (
        <div
          className="relative flex items-center h-[20%] gap-4 bg-[#F7F8F9] p-4 pl-20 pr-20 cursor-pointer z-20"
          onClick={handleColumns}
        >
          <GoPlus />
          <div>Add a list</div>
        </div>
      )}
    </div>
  );
};
