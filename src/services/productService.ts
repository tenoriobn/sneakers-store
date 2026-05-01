import type { Product, ProductFilters, ProductsResponse } from 'src/types/product.type';

const API_URL = 'http://localhost:3001/products';

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function sortProducts(products: Product[], order: ProductFilters['order']) {
  const sortedProducts = [...products];

  if (order === 'price-asc') {
    sortedProducts.sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price);
  }

  if (order === 'price-desc') {
    sortedProducts.sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
  }

  if (order === 'name-asc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (order === 'name-desc') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sortedProducts;
}

function paginateProducts(products: Product[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return products.slice(startIndex, endIndex);
}

function createResponse(products: Product[], page: number, limit: number): ProductsResponse {
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    first: 1,
    prev: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
    last: totalPages,
    pages: totalPages,
    items: totalItems,
    data: paginateProducts(products, page, limit),
  };
}

export async function getProducts(filters: ProductFilters): Promise<ProductsResponse> {
  const hasFilters = Boolean(filters.search) || Boolean(filters.category) || filters.order !== '';

  if (!hasFilters) {
    const params = new URLSearchParams({
      _page: String(filters.page),
      _per_page: String(filters.limit),
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    return response.json();
  }

  const response = await fetch(`${API_URL}?_page=1&_per_page=9999`);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  const payload = (await response.json()) as ProductsResponse;

  let filteredProducts = payload.data;

  if (filters.search) {
    const normalizedSearch = normalizeText(filters.search);

    filteredProducts = filteredProducts.filter((product) =>
      normalizeText(product.name).includes(normalizedSearch)
    );
  }

  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category);
  }

  filteredProducts = sortProducts(filteredProducts, filters.order);

  return createResponse(filteredProducts, filters.page, filters.limit);
}

export async function getCategories() {
  const response = await fetch(`${API_URL}?_page=1&_per_page=9999`);

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  const payload = (await response.json()) as ProductsResponse;

  return [...new Set(payload.data.map((product) => product.category))];
}

export async function getProductById(productId: string) {
  const response = await fetch(`${API_URL}/${productId}`);

  if (!response.ok) {
    throw new Error('Produto não encontrado');
  }

  return (await response.json()) as Product;
}

export async function getRelatedProducts(category: string, currentProductId: string) {
  const response = await fetch(`${API_URL}?_page=1&_per_page=9999`);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos relacionados');
  }

  const payload = (await response.json()) as ProductsResponse;

  return payload.data
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4);
}
