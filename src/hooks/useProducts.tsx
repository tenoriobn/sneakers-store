import { useEffect, useState } from 'react';

import { getCategories, getProducts } from 'src/services/productService';
import type { Product, ProductFilters } from 'src/types/product.type';

const INITIAL_FILTERS: ProductFilters = {
  search: '',
  category: '',
  order: 'name',
  page: 1,
  limit: 12,
};

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState<ProductFilters>(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();

      setCategories(data);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError('');

        const response = await getProducts(filters);

        setProducts(response.data);
        setPages(response.pages);
      } catch {
        setError('Não foi possível carregar os produtos.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [filters]);

  function updateFilters(nextFilters: Partial<ProductFilters>) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...nextFilters,
      page: 1,
    }));
  }

  function changePage(page: number) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      page,
    }));
  }

  return {
    products,
    categories,
    pages,
    filters,
    isLoading,
    error,
    updateFilters,
    changePage,
  };
}

export default useProducts;
