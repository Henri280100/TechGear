import { Availability } from "@/constants/enum/Availability";

export interface IProduct {
  productId: number;
  name: string;
  availability: Availability; // Availability status (e.g., "In Stock", "Out of Stock")
  productDescription: string;
  features: string[];
  imageUrl: string;
  releaseDate: string;
  hype?: number; // Optional property for hype
  daysLeft?: number; // Optional property for days left
  title: string;
  rating: number;
  maxPrice: number;
  minPrice: number;
  specs: string;
  category: {
    categoryId: number;
    categoryImage: string;
    categoryName: string;
  }; // Category of the product (e.g., "Laptop", "Mouse", etc.)
  discount?: {
    discountPercentage: number;
  }[];
  isNew: boolean;
  brand: string[];
  warranty: string;
  stockLevel: number;
  productDetails?: {
    price: number;
    finalPrice: number;
    colors?: string[];
    releaseDate: string;
    dayLeft: number;
    detailImageUrl: string;
    warranty: string;
    productStatus: string;
    specification: {
      specName: string;
      specValue: string;
      guarantee: string;
    }[];
  }[];
}

export interface GetAllProductsResponse {
  getAllProducts: IProduct[];
}

export interface IProductSearch {
  id: number;
  productName: string;
  productDescription: string;
  productCategory: string;
  productAvailability: string;
  productTags: string[];
  finalPrice: number;
  productImage: string;
}

export type ProductPreview = Pick<
  IProduct,
  | "productId"
  | "name"
  | "imageUrl"
  | "rating"
  | "specs"
  | "category"
  | "availability"
  | "isNew"
  | "discount"
  | "daysLeft"
  | "hype"
  | "productDescription"
  | "features"
  | "brand"
  | "productDetails"
> & {minPrice: number; maxPrice: number};

export interface GetAllProductPreviewResponse {
  getAllProducts: ProductPreview[];
}

export type UpComingProductPreview = Pick<
  IProduct,
  | "productId"
  | "name"
  | "productDescription"
  | "imageUrl"
  | "releaseDate"
  | "daysLeft"
  | "hype"
>;
