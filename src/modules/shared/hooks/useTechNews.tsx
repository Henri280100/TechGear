import { fetchTechNews } from "@/modules/shared/services/newsService";
import { useQuery } from "@tanstack/react-query";

export function useTechNews() {
    return useQuery({
        queryKey: ["techNews"],
        queryFn: fetchTechNews,
        refetchInterval: 60 * 60 * 1000, // 1 hour
        refetchIntervalInBackground: true,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 1,
    })
}