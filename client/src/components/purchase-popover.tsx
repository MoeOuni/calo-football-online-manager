import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IPlayerPopulated } from "@/lib/interfaces";
import { usePurchasePlayer } from "@/api";
import { API_STATUS_CODES } from "@/lib/contants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PurchasePopoverProps {
  player: IPlayerPopulated;
}

export function PurchasePopover({ player }: PurchasePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const purchasePlayerMutation = usePurchasePlayer();

  const handlePurchase = async () => {
    const response = await purchasePlayerMutation.mutateAsync(player._id);

    if (response.status === API_STATUS_CODES.SUCCESS) {
      toast.success(response?.message);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Purchase</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Confirm Purchase</h4>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to purchase {player.name} for{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(player?.saleValue ?? 0)}{" "}
              ?
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              disabled={purchasePlayerMutation.isPending}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={purchasePlayerMutation.isPending}
              onClick={handlePurchase}
            >
              {purchasePlayerMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}{" "}
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
