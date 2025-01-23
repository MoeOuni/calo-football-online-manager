import { useState } from "react";

import { MoreHorizontal, Tag, Users, XCircle } from "lucide-react";
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
import { RemovePlayerMarketDialog } from "../remove-player-market-dialog";

const PlayersActionMenu = ({ record }: { record: IPlayerPopulated }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogRemovalOpen, setIsDialogRemovalOpen] = useState(false);

  const handleListForSale = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleRemovePlayerFromMarket = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogRemovalOpen(true);
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
        <DropdownMenuContent className="w-54">
          <DropdownMenuLabel>Player Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!record?.upToSale ? (
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div
                onClick={handleListForSale}
                className="flex items-center gap-2"
              >
                <Tag className="h-4 w-4" />
                <span>List for Sale</span>
              </div>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div
                onClick={handleRemovePlayerFromMarket}
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Remove from Market</span>
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
      <RemovePlayerMarketDialog
        isDialogOpen={isDialogRemovalOpen}
        setIsDialogOpen={setIsDialogRemovalOpen}
        record={record}
      />
    </>
  );
};

export default PlayersActionMenu;
