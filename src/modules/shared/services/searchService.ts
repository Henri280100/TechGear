import { backendApiClient } from "@/app/api/config/axiosInstance";
import { ProductSearchParams, ProductSearchResponse } from "@/modules/shop/interfaces/ProductSearch";
import { getRequest } from "./httpService";
import { IProductSearch } from "@/modules/shop/interfaces";

export const searchService = async (
  query: string
): Promise<ProductSearchResponse> => {
  const trimmedQuery = query?.trim().toLowerCase() ?? '';

  // 🔁 Early return if empty string
  if (!trimmedQuery) return {product: []};

  try {
    const data = await getRequest<ProductSearchParams[]>(
      backendApiClient,
      "/product/search",
      { query: trimmedQuery }
    );
    const mappedData: IProductSearch[] = (data ?? []).map((item) => ({
      id: item.id,
      productName: item.productName ?? "",
      productDescription: item.productDescription ?? "",
      productCategory: item.productCategory ?? "",
      productAvailability: item.productAvailability ?? "",
      productImage: item.productImage ?? "",
      productTags: item.productTags ?? [],
      finalPrice: item.finalPrice ?? 0,
      productImages: item.productImage ? [item.productImage] : [],
    }));
    return { product: mappedData };
  } catch (error) {
    console.error("Search error:", error);
    return {product: []};
  }
};
