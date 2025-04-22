"use server";
export const getBoards = async () => {
  const res = await fetch("http://localhost:3000/api/board", {
    method: "GET",
  });

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    alert(data.error);
  }
};
