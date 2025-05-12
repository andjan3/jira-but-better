"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoPlus } from "react-icons/go";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { createBoard } from "@/app/actions/board/create-board";
import { toast } from "sonner";

export function CreateBoard() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBoard = await createBoard(name);
      toast.message(`Board successfully added`, {
        description: `Board "${newBoard.name}" created!`,
      });
      setName("");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create board");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-full h-[250px] text-base">
          <GoPlus fontSize={25} aria-label="Create new board" />
          Create new board
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New board</h4>
            <p className="text-sm text-muted-foreground">
              Give your board a name.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Board name*</Label>
                <Input
                  id="width"
                  type="text"
                  placeholder="Board name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="col-span-2 h-8"
                />
              </div>
            </div>
            <Button variant="default" type="submit" className="!mt-7 w-full">
              Add board
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
