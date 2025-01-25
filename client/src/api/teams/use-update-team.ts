import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, teamsQueryKeys, factoryQueryKeys } from "@/api";
import { TSFixMe } from "@/lib/interfaces";
import { type TeamFormValues } from "@/lib/schemas";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

export function useUpdateTeam() {
  const queryClient = useQueryClient();
  const params = useParams();

  const updateTeamFn = async (payload: TeamFormValues) => {
    const response = await apiClient.put(`/teams/${params.id}`, payload);

    return response.data;
  };

  return useMutation({
    mutationFn: updateTeamFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamsQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: factoryQueryKeys.composition(),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    },
  });
}
