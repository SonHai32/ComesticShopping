import { Cart } from 'src/app/models/cart.model';
export interface CartState {
  carts: Cart[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}
