import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, teamsQueryKeys, factoryQueryKeys } from "@/api";
import { TSFixMe } from "@/lib/interfaces";
import { type TeamFormValues } from "@/lib/schemas";
import { toast } from "sonner";

export function useCreateTeam() {
  const queryClient = useQueryClient();

  const createTeamFn = async (payload: TeamFormValues) => {
    const response = await apiClient.post("/teams", payload);

    return response.data;
  };

  return useMutation({
    mutationFn: createTeamFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamsQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: factoryQueryKeys.composition,
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
