import { Product } from './product.model';
export interface ProductResponse {
  product_list: Product[];
  status: 'SUCCESS' | 'FAIL';
  total_result: number;
  page: number | null;
  per_page: number | null;
}
