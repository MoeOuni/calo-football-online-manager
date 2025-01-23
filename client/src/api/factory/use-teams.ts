import { apiClient, factoryQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useTeams() {
  const getTeamsFn = async () => {
    const response = await apiClient.get("/factory/teams");
    return response.data;
  };

  return useQuery({
    queryKey: factoryQueryKeys.teams(),
    queryFn: getTeamsFn,
  });
}
