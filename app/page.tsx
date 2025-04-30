import { CreateBoard } from "@/components/board/create-board";
import { Nav } from "@/components/header/nav";
import { SideBar } from "@/components/sidebar/sidebar";

export default async function Home() {
  return (
    <div>
      <Nav />
      <div className="grid grid-cols-[18%_1fr]">
        <SideBar />
        <div className="w-full flex justify-center">
          <CreateBoard />
        </div>
      </div>
    </div>
  );
}
