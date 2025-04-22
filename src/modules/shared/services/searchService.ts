import { backendApiClient } from "@/app/api/config/axiosInstance";
import { ProductSearchParams } from "@/modules/shop/interfaces/ProductSearch";
import { getRequest } from "./httpService";

export const searchService = async (
  query: string
): Promise<ProductSearchParams[]> => {
  const trimmedQuery = query?.trim().toLowerCase() ?? '';

  // 🔁 Early return if empty string
  if (!trimmedQuery) return [];

  try {
    const data = await getRequest<ProductSearchParams[]>(
      backendApiClient,
      "/product/search",
      { query: trimmedQuery }
    );
    return data ?? [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
