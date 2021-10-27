import { Cart } from 'src/app/models/cart.model';
import { CartOnlineService } from './../../../services/cart-online.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CartActions } from './../actions/cart.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AppActions } from '../actions/app.action';

@Injectable({ providedIn: 'root' })
export class CartEffect {
  constructor(
    private action$: Actions,
    private cartOnlineService: CartOnlineService
  ) {}

  getCartEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.getCartAction),
      mergeMap(() => this.cartOnlineService.getCart()),
      map((res: any) => {
        if (res.status === 'SUCCESS') {
          return CartActions.getCartSuccessAction({
            carts: res.carts as Cart[],
          });
        } else {
          return CartActions.getCartFailAction({
            errorMessage: res.message as string,
          });
        }
      }),
      catchError((error: Error) =>
        of(
          CartActions.getCartFailAction({
            errorMessage: error.message,
          })
        )
      )
    )
  );

  getCartFailEffect = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.getCartFailAction),
      map((action) =>
        AppActions.messageAction({
          message: { title: action.errorMessage, type: 'error' },
        })
      )
    )
  );

  insertCartEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.insertCartAction),
      mergeMap((action) => this.cartOnlineService.insertCart(action.cart)),
      map((res: any) => {
        if (res.status === 'SUCCESS')
          return CartActions.insertCartSuccessAction();
        else
          return CartActions.insertCartFailAction({
            errorMessage: res.message as string,
          });
      })
    )
  );

  insertCartSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.insertCartSuccessAction),
      map(() => CartActions.getCartAction())
    )
  );

  insertCartFailEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.insertCartFailAction),
      map((action) =>
        AppActions.messageAction({
          message: { title: action.errorMessage, type: 'error' },
        })
      )
    )
  );

  updateCartQuantityEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.updateCartQuantityAction),
      mergeMap((action) =>
        this.cartOnlineService.updateCartQuantity(
          action.cartID,
          action.quantity
        )
      ),
      map((res: any) => {
        if (res.status === 'SUCCESS')
          return CartActions.updateCartQuantitySuccessAction();
        else
          return CartActions.updateCartQuantityFailAction({
            errorMessage: res.message as string,
          });
      })
    )
  );

  updateCartQuantitySuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.updateCartQuantitySuccessAction),
      map(() => CartActions.getCartAction())
    )
  );

  updateCartQuantityFailEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.updateCartQuantityFailAction),
      map((action) =>
        AppActions.messageAction({
          message: { title: action.errorMessage, type: 'error' },
        })
      )
    )
  );
}
