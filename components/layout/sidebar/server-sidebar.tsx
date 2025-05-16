import { getAllBoards } from "@/app/actions/board/get-all-boards";
import { Sidebar } from "./sidebar";

export const ServerSidebar = async () => {
  const boards = await getAllBoards();

  return <Sidebar boards={boards} />;
};
