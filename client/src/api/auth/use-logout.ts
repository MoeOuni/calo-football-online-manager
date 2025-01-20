import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, authQueryKeys } from "@/api";
import { TSFixMe } from "@/lib/interfaces";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();

  const logoutFn = async () => {
    const response = await apiClient.post("/logout");

    return response.data;
  };

  return useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.details(),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });
}
