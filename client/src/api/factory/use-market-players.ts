import { apiClient, factoryQueryKeys } from "@/api";
import { useMarketFilter } from "@/hooks/use-market-filters";
import { useQuery } from "@tanstack/react-query";

export function useMarketPlayer() {
  const [{ name, team, role }] = useMarketFilter();

  const queryParams = new URLSearchParams();

  if (name) {
    queryParams.append("search", name);
  }
  if (team) {
    queryParams.append("teamId.name", team);
  }
  if (role) {
    queryParams.append("role", role);
  }

  const getMarketPlayersFn = async () => {
    const response = await apiClient.get(
      `/factory/market-players${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`
    );
    return response.data;
  };

  return useQuery({
    queryKey: factoryQueryKeys.marketPlayersWithFilters(name, team, role),
    queryFn: getMarketPlayersFn,
  });
}
