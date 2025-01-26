"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IPlayerPopulated } from "@/lib/interfaces";
import { formatDistanceToNow } from "date-fns";

export function PlayerListingDrawer({
  players,
  children,
}: {
  players: IPlayerPopulated[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Team Details</DrawerTitle>
          <DrawerDescription>
            Detailed list of all players in the team
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[70vh] px-2 md:px-8 lg:px-12">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Team</TableHead>
                <TableHead className="hidden md:table-cell">
                  Up for Sale
                </TableHead>
                <TableHead>Sale Value</TableHead>
                <TableHead className="hidden md:table-cell">
                  Updated At
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player._id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell className="capitalize">{player.role}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {player?.teamId?.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {player.upToSale ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    {player.saleValue !== undefined &&
                    player.saleValue !== null &&
                    player?.saleValue !== 0
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(player?.saleValue ?? 0)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {player?.updatedAt &&
                      formatDistanceToNow(new Date(player?.updatedAt), {
                        addSuffix: true,
                      })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
