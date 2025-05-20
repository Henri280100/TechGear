import { create } from "zustand";
import { ProductPreview } from "../interfaces";

type ProductStore = {
  /**
   * The current product being previewed
   */
  previewProduct: ProductPreview | null;
  /**
   * Sets the current product being previewed
   * @param p The product to preview, or null to clear the preview
   */
  setPreviewProduct: (p: ProductPreview | null) => void;
  /**
   * The active brand filter
   */
  activeBrand: string;
  /**
   * Sets the active brand filter
   * @param b The brand to filter by, or "all" to clear the filter
   */
  setActiveBrand: (b: string) => void;
};

/**
 * A store for managing the state of the product list
 */
export const useProductStore = create<ProductStore>((set) => ({
  previewProduct: null,
  setPreviewProduct: (p) => set({ previewProduct: p }),
  activeBrand: "all",
  setActiveBrand: (b) => set({ activeBrand: b }),
}));

