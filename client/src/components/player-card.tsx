import { User } from "lucide-react";

import { PurchasePopover } from "./purchase-popover";
import { IPlayerPopulated } from "@/lib/interfaces";

interface PlayerCardProps {
  player: IPlayerPopulated;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-muted/45 border rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">{player.name}</h2>
        <div className="text-gray-600 dark:text-gray-200 mb-4">
          {player.teamId?.name || "No Team"}
        </div>
        <div className="bg-gray-200 rounded-full p-6 mb-4">
          <User size={48} className="text-gray-600" />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-200 mb-2 capitalize">{player.role}</div>
        <div className="text-lg font-bold text-green-600 mb-4">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(player?.saleValue ?? 0)}
        </div>
        <PurchasePopover player={player} />
      </div>
    </div>
  );
}
