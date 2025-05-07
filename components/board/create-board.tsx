"use client";
import { createBoard } from "@/app/actions/board/create-board";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "sonner";

export const CreateBoard = () => {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBoard = await createBoard(name);
      toast.message(`Board successfully added`, {
        description: `Board "${newBoard.name}" created!`,
      });
      setName("");
      setShowForm(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create board");
    }
  };

  return (
    <>
      {!showForm && (
        <div
          className="flex items-center gap-2 cursor-pointer text-white p-4 rounded-md bg-[#1868db] h-[50px] mr-[22%]"
          onClick={() => setShowForm(true)}
        >
          <GoPlusCircle fontSize={30} aria-label="Create board" />
          <button className="text-[20px]">Create board</button>
        </div>
      )}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-gray-100 rounded-md flex items-center gap-2 h-[70px] mr-[22%]"
        >
          <input
            type="text"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Create
          </button>
          <IoIosCloseCircleOutline
            fontSize={30}
            className="cursor-pointer"
            onClick={() => setShowForm(false)}
            aria-label="Close form for creating a bord"
          />
        </form>
      )}
    </>
  );
};
