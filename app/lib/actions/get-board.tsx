export const getBoard = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/dashboard/${id}`);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch board:", error);
    throw error;
  }
};
