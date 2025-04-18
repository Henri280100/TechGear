import { fetchTechNews } from "@/modules/shared/services/newsService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useTechNews() {
  return useInfiniteQuery({
    queryKey: ["techNews"],
    queryFn: fetchTechNews,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
