import { MoreHorizontal, Tag, Users } from "lucide-react";
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
import { IPlayerPopulated } from "@/lib/interfaces";

const PlayersActionMenu = ({ record }: { record: IPlayerPopulated }) => {
  return (
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
        <DropdownMenuItem>
          <Tag className="mr-1 h-4 w-4" />
          List for Sale
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-1 h-4 w-4" />
          Assign to Team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlayersActionMenu;
