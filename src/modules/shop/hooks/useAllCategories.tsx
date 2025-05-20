import { graphqlClient } from "@/app/api/config/graphqlClient";
import { GET_ALL_CATEGORIES } from "@/providers/graphql/queries/category";
import { useQuery } from "@tanstack/react-query"

export const useAllCategories = () => {
    return useQuery({
        queryKey: ["all-categories"],
        queryFn: async () => {
            const data = await graphqlClient.request(GET_ALL_CATEGORIES);
            return data?.getAllCategories;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnWindowFocus: false,
    })
}