import { graphqlClient } from "@/app/api/config/graphqlClient";
import { GET_ALL_CATEGORIES } from "@/providers/graphql/queries/category";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetAllCategoriesResponse } from "../interfaces/ICategory";

export const useAllCategories = (): UseQueryResult<
  GetAllCategoriesResponse,
  Error
> => {
  return useQuery<GetAllCategoriesResponse, Error>({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const data = await graphqlClient.request<GetAllCategoriesResponse>(
        GET_ALL_CATEGORIES
      );
      return { getAllCategories: data?.getAllCategories ?? [] };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};
