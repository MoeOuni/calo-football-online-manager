import { useQuery } from "@tanstack/react-query";
import { apiClient, draftsQueryKeys } from "@/api";

export function useDraft({
  isAuthorized,
  type,
}: {
  isAuthorized: boolean;
  type: string;
}) {
  const getDraftFn = async () => {
    if (!isAuthorized) {
      return null;
    }
    const response = await apiClient.get(`/drafts/${type}`);
    return response.data;
  };

  return useQuery({
    queryKey: draftsQueryKeys.details(),
    queryFn: getDraftFn,
    enabled: isAuthorized,
  });
}
