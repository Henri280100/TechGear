import { graphqlClient } from "@/app/api/config/graphqlClient";
import { GET_ALL_PRODUCTS } from "@/providers/graphql/queries/products";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetAllProductPreviewResponse } from "../interfaces";

/**
 * Custom hook to fetch all products using GraphQL.
 * @returns UseQueryResult containing the list of products or error state.
 */
export const useAllProducts = (): UseQueryResult<GetAllProductPreviewResponse, Error> => {
  return useQuery<GetAllProductPreviewResponse, Error>({
    queryKey: ["all-products"],
    queryFn: async () => {
      const data = await graphqlClient.request<GetAllProductPreviewResponse>(GET_ALL_PRODUCTS);
      return { getAllProducts: data?.getAllProducts ?? [] };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};
