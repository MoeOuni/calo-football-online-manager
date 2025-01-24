import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, factoryQueryKeys } from "@/api";
import { TSFixMe } from "@/lib/interfaces";
import { toast } from "sonner";

export function usePurchasePlayer() {
  const queryClient = useQueryClient();

  const purchasePlayerFn = async (playerId: string) => {
    const response = await apiClient.post(`/players/purchase/${playerId}`);

    return response.data;
  };

  return useMutation({
    mutationFn: purchasePlayerFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: factoryQueryKeys.marketPlayers(),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });
}
