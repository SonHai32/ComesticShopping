import { Cart } from 'src/app/models/cart.model';
import { createAction, props } from '@ngrx/store';
enum CartActionTypes {
  GET_CART = '[CART_ACTION] Get cart',
  GET_CART_SUCCESS  = '[CART_ACTION] Get cart success',
  GET_CART_FAIL = '[CART_ACTION] Get cart type',

  INSERT_CART = '[CART_ACTION] Insert cart',
  INSERT_CART_SUCCESS = '[CART_ACTION] Insert cart success',
  INSERT_CART_FAIL = '[CART_ACTION] Insert cart fail',

  UPDATE_CART_QUANTITY = '[CART_ACTION] Update cart quantity',
  UPDATE_CART_QUANTITY_SUCCESS = '[CART_ACTION] Update cart quantity success',
  UPDATE_CART_QUANTITY_FAIL = '[CART_ACTION] Update cart quantity fail',

  DELETE_CART = '[CART_ACTION] Delete cart',
  DELETE_CART_SUCCESS = '[CART_ACTION] Delete cart success',
  DELETE_CART_FAIL = '[CART_ACTION] Delete cart fail'
}

export const getCartAction = createAction(CartActionTypes.GET_CART)
export const getCartSuccessAction = createAction(CartActionTypes.GET_CART_SUCCESS, props<{carts: Cart[]}>())
export const getCartFailAction = createAction(CartActionTypes.GET_CART_FAIL, props<{errorMessage: string}>())
export const insertCartAction = createAction(CartActionTypes.INSERT_CART, props<{cart: Cart}>())
export const insertCartSuccessAction  = createAction(CartActionTypes.INSERT_CART_SUCCESS)
export const insertCartFailAction = createAction(CartActionTypes.INSERT_CART_FAIL, props<{errorMessage: string}>())
export const updateCartQuantityAction = createAction(CartActionTypes.UPDATE_CART_QUANTITY, props<{cartID: string, quantity: number}>())
export const updateCartQuantitySuccessAction = createAction(CartActionTypes.UPDATE_CART_QUANTITY_SUCCESS)
export const updateCartQuantityFailAction = createAction(CartActionTypes.UPDATE_CART_QUANTITY_FAIL, props<{errorMessage: string}>())

export const CartActions = {
  getCartAction,
  getCartSuccessAction,
  getCartFailAction,
  insertCartAction,
  insertCartSuccessAction,
  insertCartFailAction,
  updateCartQuantityAction,
  updateCartQuantitySuccessAction,
  updateCartQuantityFailAction
}
