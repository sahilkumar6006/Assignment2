import { Product } from '../store/slices/cartSlice';

export const PRODUCTS: Product[] = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  title: `Product ${i + 1}`,
  price: Number((Math.random() * 90 + 10).toFixed(2)),
}));
