import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, authQueryKeys } from "@/api";
import { TSFixMe, IForgotPwd } from "@/lib/interfaces";

export function useForgotPwd() {
  const queryClient = useQueryClient();

  const forgotPwdFn = async (payload: IForgotPwd) => {
    return null;
  };

  return useMutation({
    mutationFn: forgotPwdFn,
    onSuccess: () => {
      // Todo
    },
    onError: (error: TSFixMe) => {
      // Todo
    },
  });
}
