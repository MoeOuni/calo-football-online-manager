import { apiClient, factoryQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useMeTeams() {
  const getMeTeamsFn = async () => {
    const response = await apiClient.get("/teams/me");
    return response.data;
  };

  return useQuery({
    queryKey: factoryQueryKeys.meTeams(),
    queryFn: getMeTeamsFn,
  });
}
