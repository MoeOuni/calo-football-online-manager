import { apiClient, factoryQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function usePlayer() {
  const getPlayersFn = async () => {
    const response = await apiClient.get("/factory/players");
    return response.data;
  };

  return useQuery({
    queryKey: factoryQueryKeys.players(),
    queryFn: getPlayersFn,
  });
}
