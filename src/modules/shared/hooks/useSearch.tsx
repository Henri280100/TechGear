import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { searchService } from "../services/searchService";
import { ProductSearchResponse } from "@/modules/shop/interfaces/ProductSearch";

/**
 * Custom hook to perform a search based on a query string.
 * @param query The search query string to filter products.
 * @returns UseQueryResult containing the search results or error state.
 */
export function useSearch(
  query: string
): UseQueryResult<ProductSearchResponse, Error> {
  const trimmedQuery = query?.trim().toLowerCase();

  // Only call the query function if the query is not empty
  return useQuery<ProductSearchResponse, Error>({
    queryKey: ["search", trimmedQuery],
    queryFn: () => searchService(trimmedQuery) as Promise<ProductSearchResponse>,
    enabled: !!trimmedQuery, // Only run the query if the query string is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
}
