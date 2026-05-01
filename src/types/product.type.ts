export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export type ProductOrder = '' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export type ProductFilters = {
  search: string;
  category: string;
  order: ProductOrder;
  page: number;
  limit: number;
};

export type ProductsResponse = {
  data: Product[];
  pages: number;
  items: number;
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
};
