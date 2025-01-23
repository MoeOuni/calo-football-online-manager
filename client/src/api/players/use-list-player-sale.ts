import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, playersQueryKeys, factoryQueryKeys } from "@/api";
import { TSFixMe } from "@/lib/interfaces";
import { type PriceFormValues } from "@/lib/schemas";
import { toast } from "sonner";

export function useListPlayerSale() {
  const queryClient = useQueryClient();

  const listPlayerSaleFn = async (payload: PriceFormValues) => {
    const response = await apiClient.post("/players/sell", payload);

    return response.data;
  };

  return useMutation({
    mutationFn: listPlayerSaleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playersQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: factoryQueryKeys.teams,
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });
}
