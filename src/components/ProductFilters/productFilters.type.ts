import type { ProductFilters as ProductFiltersType } from "src/types/product.type";

export type ProductFiltersProps = {
  categories: string[];
  filters: ProductFiltersType;
  onChange: (filters: Partial<ProductFiltersType>) => void;
};
