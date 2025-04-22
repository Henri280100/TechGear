import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/searchService";

export function useSearch(query: string) {
    const trimmedQuery = query?.trim().toLowerCase();
  
    // Only call the query function if the query is not empty
    return useQuery({
      queryKey: ["search", trimmedQuery],
      queryFn: () => searchService(trimmedQuery),
      enabled: !!trimmedQuery, // Only run the query if the query string is not empty
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
    });
}
