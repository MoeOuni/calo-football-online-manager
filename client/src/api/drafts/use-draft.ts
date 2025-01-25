import { useQuery } from "@tanstack/react-query";
import { apiClient, draftsQueryKeys } from "@/api";

export function useDraft(type: string) {
  const getDraftFn = async () => {
    const response = await apiClient.get(`/drafts/${type}`);
    return response.data;
  };

  return useQuery({
    queryKey: draftsQueryKeys.details(),
    queryFn: getDraftFn,
  });
}
