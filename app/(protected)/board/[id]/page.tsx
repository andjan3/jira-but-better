/**
 * BoardPage
 * -----------------
 * Renders the board view by displaying all columns using the Columns component.
 * This is the main content area for a specific board.
 */

import { Columns } from "@/components/board/columns";

export default function BoardPage() {
  return <Columns />;
}
