import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, authQueryKeys } from "@/api";
import { TSFixMe, ILogin } from "@/lib/interfaces";
import { toast } from "sonner";

export function useLogin() {
  const queryClient = useQueryClient();

  const loginFn = async (payload: ILogin) => {
    const response = await apiClient.post("/login", payload);

    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useMutation({
    mutationFn: loginFn,
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
