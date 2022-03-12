import { ProductGroup } from './product-group.model';
import { Category } from './category.model';
export interface Product {
  _id?: string;
  name: string;
  description: string;
  category: Category;
  original_price: number;
  sell_price: number;
  display_price: number;
  profit: number;
  discount: number;
  rating: number;
  quantity: number;
  brand: string;
  slug: string;
  sizes?: string[];
  colors?: string[];
  images_list: string[];
  display_image: string;
  post_markdown?: string;
  product_groups?: ProductGroup[];
  created_detail: {
    created_at: Date;
    created_by_id: string;
    created_by_username: string;
  };
  last_modify: {
    updated_by_id: string;
    updated_by_username: string;
    updated_at: Date;
  };
}
