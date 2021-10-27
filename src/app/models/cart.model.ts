import { Product } from './product.model';
export interface Cart {
  product: Product;
  quantity: number;
  total?: number;
  created_by?: string;
}

