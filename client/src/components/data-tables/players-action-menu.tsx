import { Info, MoreHorizontal, Tag, Users } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IPlayerPopulated } from "@/lib/interfaces";

const PlayersActionMenu = ({ record }: { record: IPlayerPopulated }) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"sm"} className="h-6 w-6 p-0">
            <span className="sr-only">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Player Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Tag className="mr-1 h-4 w-4" />
              List for Sale
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem>
            <Users className="mr-1 h-4 w-4" />
            Assign to Team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>
              List <span className="text-green-600">{record?.name}</span> for
              Sale
            </span>
          </DialogTitle>
          <DialogDescription>
            <ul>
              <li className="flex items-center space-x-2 cursor-help">
                <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>
                  Once a player is sold you get 95% of the orignal price.
                </span>
              </li>
            </ul>
          </DialogDescription>
          {/* TODO */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayersActionMenu;
