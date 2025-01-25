import { TSFixMe } from "@/lib/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, draftsQueryKeys } from "@/api";
import { toast } from "sonner";

export function useSaveDraft() {
  const queryClient = useQueryClient();

  const saveDraftFn = async (payload: TSFixMe) => {
    const response = await apiClient.post("/drafts", payload);

    return response.data;
  };

  return useMutation({
    mutationFn: saveDraftFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: draftsQueryKeys.details(),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });
}
