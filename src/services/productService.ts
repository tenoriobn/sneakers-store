import type {
  Product,
  ProductFilters,
  ProductsResponse,
} from "src/types/product.type";

const API_URL = "http://localhost:3001/products";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function sortProducts(products: Product[], order: ProductFilters["order"]) {
  const sortedProducts = [...products];

  if (order === "price-asc") {
    sortedProducts.sort(
      (firstProduct, secondProduct) => firstProduct.price - secondProduct.price,
    );
  }

  if (order === "price-desc") {
    sortedProducts.sort(
      (firstProduct, secondProduct) => secondProduct.price - firstProduct.price,
    );
  }

  if (order === "name") {
    sortedProducts.sort((firstProduct, secondProduct) =>
      firstProduct.name.localeCompare(secondProduct.name),
    );
  }

  return sortedProducts;
}

export async function getProducts(
  filters: ProductFilters,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    _page: String(filters.page),
    _per_page: String(filters.limit),
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  const payload = (await response.json()) as ProductsResponse;

  let filteredProducts = payload.data;

  if (filters.search) {
    const normalizedSearch = normalizeText(filters.search);

    filteredProducts = filteredProducts.filter((product) =>
      normalizeText(product.name).includes(normalizedSearch),
    );
  }

  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category,
    );
  }

  filteredProducts = sortProducts(filteredProducts, filters.order);

  return {
    ...payload,
    data: filteredProducts,
  };
}

export async function getCategories() {
  const response = await fetch(`${API_URL}?_page=1&_per_page=1000`);

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  const payload = (await response.json()) as ProductsResponse;

  return [...new Set(payload.data.map((product) => product.category))];
}
