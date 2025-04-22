import { Availability } from "@/constants/enum/Availability";

export interface IProduct {
  productId: number;
  name: string;
  productAvailability: Availability; // Availability status (e.g., "In Stock", "Out of Stock")
  description: string;
  features: string[];
  image: string;
  releaseDate: string;
  hype?: number; // Optional property for hype
  daysLeft?: number; // Optional property for days left
  title: string;
  rating: number;
  price: number;
  maxPrice: number;
  minPrice: number;
  specs: string;
  category: string; // Category of the product (e.g., "Laptop", "Mouse", etc.)
  discount: number;
  isNew: boolean;
  colors: string[];
  brand: string[];
  warranty: string;
  stockLevel: number;
}

export type ProductPreview = Pick<
  IProduct,
  | "productId"
  | "name"
  | "image"
  | "price"
  | "rating"
  | "specs"
  | "category"
  | "productAvailability"
  | "isNew"
  | "discount"
  | "colors"
  | "daysLeft"
  | "hype"
  | "description"
  | "features"
  | "brand"
>;

export type UpComingProductPreview = Pick<
  IProduct,
  | "productId"
  | "name"
  | "description"
  | "image"
  | "releaseDate"
  | "daysLeft"
  | "hype"
>;
