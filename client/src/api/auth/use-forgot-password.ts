import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, authQueryKeys } from "@/api";
import { TSFixMe, IResetPwd } from "@/lib/interfaces";
import { toast } from "sonner";

export function useForgotPwd() {
  const queryClient = useQueryClient();

  const forgotPwdFn = async (payload: IResetPwd) => {
    const response = await apiClient.post("/forgot-password", payload);

    return response.data;
  };

  return useMutation({
    mutationFn: forgotPwdFn,
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
