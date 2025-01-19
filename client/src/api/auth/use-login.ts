import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, authQueryKeys } from "@/api";
import { TSFixMe, ILogin } from "@/lib/interfaces";

export function useLogin() {
  const queryClient = useQueryClient();

  const loginFn = async (payload: ILogin) => {
    return null;
  };

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      // Todo
    },
    onError: (error: TSFixMe) => {
      // Todo
    },
  });
}
