/**
 * ServerSidebar component.
 * -----------------------------------
 *
 * Server-side component that fetches all boards data.
 * - Uses `getAllBoards` async action to retrieve boards.
 * - Passes the boards as props to the client-side `Sidebar` component.
 */

import { getAllBoards } from "@/app/actions/board/get-all-boards";
import { Sidebar } from "./sidebar";

export const ServerSidebar = async () => {
  const boards = await getAllBoards();

  return <Sidebar boards={boards} />;
};
