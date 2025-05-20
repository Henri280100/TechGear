import { IProductSearch } from "./IProduct";

export interface ProductSearchParams {
  id: number;
  productDescription: string;
  productName: string;
  finalPrice: number;
  productCategory: string;
  productAvailability: string;
  productImage: string;
  productTags: string[];
  
}

export interface ProductSearchResponse {
  product: IProductSearch[];
}
