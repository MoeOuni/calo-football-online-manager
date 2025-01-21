import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, authQueryKeys } from "@/api";
import { TSFixMe, IResetPwd } from "@/lib/interfaces";
import { toast } from "sonner";

export function useResetPwd() {
  const queryClient = useQueryClient();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const restPwdFn = async (payload: IResetPwd) => {
    const response = await apiClient.put(`/reset-password/${token}`, payload);
    return response.data;
  };

  return useMutation({
    mutationFn: restPwdFn,
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
