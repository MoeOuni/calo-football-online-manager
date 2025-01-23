import { apiClient, factoryQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useMarketPlayer() {
  const getMarketPlayersFn = async () => {
    const response = await apiClient.get("/factory/market-players");
    return response.data;
  };

  return useQuery({
    queryKey: factoryQueryKeys.marketPlayers(),
    queryFn: getMarketPlayersFn,
  });
}
