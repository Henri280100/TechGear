import { IProducts } from "../interfaces/IProducts";

type ProductWithoutSlug = Omit<
  IProducts,
  "slug"
>;

export type { ProductWithoutSlug };
