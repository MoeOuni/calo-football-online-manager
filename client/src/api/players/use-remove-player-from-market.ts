import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, factoryQueryKeys } from "@/api";
import { TSFixMe } from "@/lib/interfaces";
import { toast } from "sonner";

export function useRemovePlayerFromMarket() {
  const queryClient = useQueryClient();

  const removePlayerFromFn = async (playerId: string) => {
    const response = await apiClient.put(`/players/sell/remove/${playerId}`);

    return response.data;
  };

  return useMutation({
    mutationFn: removePlayerFromFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: factoryQueryKeys.players(),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });
}
