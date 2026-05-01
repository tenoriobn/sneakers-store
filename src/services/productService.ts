import type { Product, ProductFilters, ProductsResponse } from 'src/types/product.type';

const API_URL = '/data/db.json';

type DatabaseResponse = {
  products: Product[];
};

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function sortProducts(products: Product[], order: ProductFilters['order']) {
  const sortedProducts = [...products];

  if (order === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (order === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
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
  const start = (page - 1) * limit;
  const end = start + limit;

  return products.slice(start, end);
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

async function getDatabase() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return (await response.json()) as DatabaseResponse;
}

export async function getProducts(filters: ProductFilters): Promise<ProductsResponse> {
  const database = await getDatabase();

  let products = database.products;

  if (filters.search) {
    const search = normalizeText(filters.search);

    products = products.filter((product) => normalizeText(product.name).includes(search));
  }

  if (filters.category) {
    products = products.filter((product) => product.category === filters.category);
  }

  products = sortProducts(products, filters.order);

  return createResponse(products, filters.page, filters.limit);
}

export async function getCategories() {
  const database = await getDatabase();

  return [...new Set(database.products.map((product) => product.category))];
}

export async function getProductById(productId: string) {
  const database = await getDatabase();

  const product = database.products.find((item) => item.id === productId);

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  return product;
}

export async function getRelatedProducts(category: string, currentProductId: string) {
  const database = await getDatabase();

  return database.products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4);
}
