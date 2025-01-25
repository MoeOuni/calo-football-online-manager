import { apiClient, teamsQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useTeamPopulated() {
  const params = useParams();

  const getTeamPopulatedFn = async () => {
    const response = await apiClient.get(`/teams/populate/${params.id}`);
    return response.data;
  };

  return useQuery({
    queryKey: teamsQueryKeys.detail(params.id ?? ""),
    queryFn: getTeamPopulatedFn,
  });
}
