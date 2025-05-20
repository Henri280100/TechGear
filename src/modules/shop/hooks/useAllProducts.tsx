import { graphqlClient } from "@/app/api/config/graphqlClient";
import { GET_ALL_PRODUCTS } from "@/providers/graphql/queries/products";
import { useQuery } from "@tanstack/react-query";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const data = await graphqlClient.request(GET_ALL_PRODUCTS);
      return data?.getAllProducts;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};

