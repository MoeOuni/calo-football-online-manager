import { useState } from "react";

import { MoreHorizontal, Tag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { IPlayerPopulated } from "@/lib/interfaces";
import { SellPlayerDialog } from "../sell-player-dialog";

const PlayersActionMenu = ({ record }: { record: IPlayerPopulated }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleListForSale = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  return (
    <>
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
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div
              onClick={handleListForSale}
              className="flex items-center gap-2"
            >
              <Tag className="h-4 w-4" />
              <span>List for Sale</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Assign to Team
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SellPlayerDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        record={record}
      />
    </>
  );
};

export default PlayersActionMenu;
