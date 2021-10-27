import { CartActions } from './../actions/cart.action';
import { createReducer, on } from '@ngrx/store';
import { CartState } from './../state/cart.state';
const initialCartState: CartState = {
  carts: [],
  errorMessage: '',
  hasError: false,
  isLoading: false,
};

export const CartReducer = createReducer(
  initialCartState,

  on(CartActions.getCartAction, (state: CartState) => ({
    ...state,
    isLoading: true,
  })),

  on(CartActions.getCartSuccessAction, (state: CartState, { carts }) => ({
    ...state,
    isLoading: false,
    carts,
  })),

  on(CartActions.getCartFailAction, (state: CartState, { errorMessage }) => ({
    ...state,
    isLoading: false,
    hasError: true,
    errorMessage,
  })),

  on(CartActions.insertCartAction, (state: CartState) => ({
    ...state,
    isLoading: true,
  })),

  on(CartActions.insertCartSuccessAction, (state: CartState) => ({
    ...state,
    isLoading: true,
  })),

  on(
    CartActions.insertCartFailAction,
    (state: CartState, { errorMessage }) => ({
      ...state,
      isLoading: false,
      errorMessage,
      hasError: true,
    })
  ),

  on(CartActions.updateCartQuantityAction, (state: CartState) => ({
    ...state,
    isLoading: true,
  })),

  on(CartActions.updateCartQuantitySuccessAction, (state: CartState) => ({
    ...state,
    isLoading: false,
  })),

  on(
    CartActions.updateCartQuantityFailAction,
    (state: CartState, { errorMessage }) => ({ ...state, errorMessage })
  ),

);
