import { apiClient, factoryQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useComposition({ isAuthorized }: { isAuthorized: boolean }) {
    const getCompositionFn = async () => {
        if (!isAuthorized) {
            return null;
        }
        const response = await apiClient.get("/factory/composition");
        return response.data;
    };

    return useQuery({
        queryKey: factoryQueryKeys.composition(),
        queryFn: getCompositionFn,
        enabled: isAuthorized,
    });
}
