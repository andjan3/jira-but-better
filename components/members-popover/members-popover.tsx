import { unAssignUser } from "@/app/actions/client-actions";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MembersPopOverProps {
  item: {
    assignedAt: Date;
    taskId: number;
    user: {
      id: number;
      email: string;
      username: string;
      password: string;
    };
    userId: number;
  };

  boardId?: number | null;
}

export function MembersPopOver({ item, boardId }: MembersPopOverProps) {
  const handleRemoveAssignment = async () => {
    if (boardId == null) {
      return;
    }
    await unAssignUser(item.taskId, item.userId, boardId);
  };

  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="text-white bg-[#1868DB] rounded-full w-8 h-8 flex items-center justify-center text-xs uppercase hover:bg-[#3b79d0]"
          onClick={handlePopoverClick}
        >
          {item.user.username.slice(0, 2)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 rounded-xl">
        <div className="grid gap-4">
          <div className="flex space-y-2 bg-[#1868DB] h-[100px] gap-5 justify-center rounded-t-xl">
            <div className="text-white bg-[#1868DB] rounded-full w-28 h-28 flex items-center justify-center text-3xl uppercase border-[1px] border-white mt-5">
              {item.user.username.slice(0, 2)}
            </div>
            <div className="min-w-[150px] flex flex-col justify-center">
              <h4 className="font-medium leading-none capitalize text-white">
                {item.user.username}
              </h4>
              <p className="text-sm text-muted-foreground text-white">
                {item.user.email}
              </p>
            </div>
          </div>
          <div className="grid gap-2 p-4 mt-6">
            <div
              className="cursor-pointer hover:bg-[#F7F8F9] p-4"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveAssignment();
              }}
            >
              Remove from card
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
