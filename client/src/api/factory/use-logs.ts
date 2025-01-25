import { apiClient, factoryQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useLogs({ page, limit }: { page: number; limit: number }) {
  const getLogsFn = async () => {
    const response = await apiClient.get(
      `/factory/logs?page=${page}&limit=${limit}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: factoryQueryKeys.logs(),
    queryFn: getLogsFn,
  });
}
