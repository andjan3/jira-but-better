"use client";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const CreateBoard = () => {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const createBoard = async () => {
    const res = await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Board "${data.name}" created!`);
      setName("");
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      {!showForm && (
        <div
          className="flex items-center gap-2 cursor-pointer text-white p-4 rounded-md bg-[#1868db]"
          onClick={() => handleForm()}
        >
          <GoPlusCircle fontSize={30} />
          <button className="text-[20px]">Create board</button>
        </div>
      )}
      {showForm && (
        <form className="p-4 bg-gray-100 rounded-md flex items-center gap-2">
          <input
            type="text"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={createBoard}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Create
          </button>
          <IoIosCloseCircleOutline
            fontSize={30}
            className="cursor-pointer"
            onClick={() => handleForm()}
          />
        </form>
      )}
    </>
  );
};

/* 

"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";

export const CreateBoard = () => {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const createBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    const router = useRouter();
    const res = await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Board "${data.name}" created!`);
      setName("");
      setShowForm(false);
      router.push(`/dashboard/${data.id}`);
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      {!showForm && (
        <div
          className="flex items-center gap-2 cursor-pointer text-white p-4 rounded-md bg-[#1868db]"
          onClick={() => handleForm()}
        >
          <GoPlusCircle fontSize={30} />
          <button className="text-[20px]">Create</button>
        </div>
      )}
      {showForm && (
        <form className="p-4 bg-gray-100 rounded-md flex gap-2">
          <input
            type="text"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={createBoard}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Create Board
          </button>
        </form>
      )}
    </>
  );
}; */
