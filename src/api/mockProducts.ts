import PRODUCT_DATA from '../screens/Data/products.json';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  love?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  sizes?: (number | string)[];
};

export type FetchParams = {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: 'priceAsc' | 'priceDesc' | 'rating';
};

// simple in-memory mock API that supports pagination, search and sorting
export async function fetchProducts({ page = 1, limit = 20, query = '', sortBy }: FetchParams = {}) {
  // flatten featured + popular for the mock
  const all: Product[] = [...PRODUCT_DATA.featured, ...PRODUCT_DATA.popular];

  let filtered = all;

  if (query && query.trim().length > 0) {
    const q = query.trim().toLowerCase();
    filtered = all.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
  }

  if (sortBy) {
    if (sortBy === 'priceAsc') filtered = filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceDesc') filtered = filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') filtered = filtered.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  // simulate network latency
  await new Promise<void>(resolve => setTimeout(() => resolve(), 200));

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
