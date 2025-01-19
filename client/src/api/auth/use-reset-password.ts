import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, authQueryKeys } from "@/api";
import { TSFixMe, IResetPwd } from "@/lib/interfaces";

export function useResetPwd() {
  const queryClient = useQueryClient();

  const restPwdFn = async (payload: IResetPwd) => {
    // Todo
    return null;
  };

  return useMutation({
    mutationFn: restPwdFn,
    onSuccess: () => {
      // Todo
    },
    onError: (error: TSFixMe) => {
      // Todo
    },
  });
}
