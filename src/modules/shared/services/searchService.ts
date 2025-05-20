import { backendApiClient } from "@/app/api/config/axiosInstance";
import { ProductSearchParams, ProductSearchResponse } from "@/modules/shop/interfaces/ProductSearch";
import { getRequest } from "./httpService";
import { IProductSearch } from "@/modules/shop/interfaces";

export const searchService = async (
  query: string
): Promise<ProductSearchResponse> => {
  const trimmedQuery = query?.trim().toLowerCase() ?? '';

  try {
    const response = await getRequest<{ product: ProductSearchParams[] }>(
      backendApiClient,
      "/product/search",
      trimmedQuery ? { query: trimmedQuery } : {} // Empty object for all products
    );
    const data = response?.product ?? []; // Extract the product array from the json property
    if (!Array.isArray(data)) {
      console.warn("Unexpected response format, expected product array:", response);
      return { product: [] };
    }
    console.log("Response:", response?.product);
    const mappedData: IProductSearch[] = data.map((item) => ({
      id: item.id,
      productName: item.productName ?? "",
      productDescription: item.productDescription ?? "",
      productCategory: item.productCategory ?? "",
      productAvailability: item.productAvailability ?? "",
      productImage: item.productImage ?? "",
      productTags: item.productTags ?? [],
      finalPrice: item.finalPrice ?? 0,
    }));
    console.log("Data: ", data);
    return { product: mappedData };
  } catch (error) {
    console.error("Search error:", error);
    return { product: [] };
  }
};
