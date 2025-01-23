import { useRemovePlayerFromMarket } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_STATUS_CODES } from "@/lib/contants";
import { IPlayerPopulated } from "@/lib/interfaces";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function RemovePlayerMarketDialog({
  record,
  isDialogOpen,
  setIsDialogOpen,
}: {
  record: IPlayerPopulated;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}) {
  const removePlayerSaleMutation = useRemovePlayerFromMarket();

  const handleConfirm = async () => {
    const response = await removePlayerSaleMutation.mutateAsync(record._id);

    if (response.status === API_STATUS_CODES.SUCCESS) {
      toast.success(response.message);
      setIsDialogOpen(false);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{" "}
            <strong className="text-green-600">{record?.name}</strong> from the
            market?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={removePlayerSaleMutation.isPending}
            type="button"
            variant={"outline"}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={removePlayerSaleMutation.isPending}
            type="submit"
            onClick={handleConfirm}
          >
            {removePlayerSaleMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}{" "}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
