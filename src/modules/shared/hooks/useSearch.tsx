import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { searchService } from "../services/searchService";
import { ProductSearchResponse } from "@/modules/shop/interfaces/ProductSearch";

/**
 * Custom hook to perform a search based on a query string.
 * @param query The search query string to filter products.
 * @returns UseQueryResult containing the search results or error state.
 */
export function useSearch(query: string | undefined): UseQueryResult<ProductSearchResponse, Error> {
  const trimmedQuery = (query ?? "").trim().toLowerCase(); // Ensure trimmedQuery is always a string
  const effectiveQuery = trimmedQuery || "empty"; // Default to "empty" to avoid null

  return useQuery<ProductSearchResponse, Error>({
    queryKey: ["search", effectiveQuery],
    queryFn: () => searchService(trimmedQuery),
    enabled: true, // Allow query to run even with empty string, handle in service
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
}
